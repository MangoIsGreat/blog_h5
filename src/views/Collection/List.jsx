import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { PullToRefresh, ListView, List, Icon, Toast } from "antd-mobile";
import NoData from "../../components/NoData";

const Item = List.Item;

const NUM_ROWS = 20;
let pageIndex = 1;

class CList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      userInfo: JSON.parse(localStorage.getItem("user_info")) || {}, // 用户信息
    };
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }

  async componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      height: hei,
      refreshing: false,
      isLoading: false,
    });
  }

  // 获取列表数据
  genData = async () => {
    const { userInfo } = this.state;

    const listData = await this.$axios.get("/author/collection", {
      params: {
        pageSize: NUM_ROWS,
        pageIndex: pageIndex,
        uid: userInfo.id,
      },
    });

    if (listData.error_code === 0) {
      return listData.data.list;
    } else {
      Toast.info("数据获取失败", 1.5);
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.rData = this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false,
      isLoading: false,
    });
  };

  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });
    const newData = this.genData(++pageIndex);
    this.rData = [...this.rData, ...newData];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  renderRowList = () => {
    const that = this;

    return (rowData, sectionID, rowID) => (
      <List
        className="my-list"
        onClick={() => {
          that.toArtList(rowData);
        }}
      >
        <Item arrow="horizontal" multipleLine>
          <span style={{ fontSize: "18px" }}>{rowData.type}</span>&nbsp;
          <span style={{ color: "#888", fontSize: "15px" }}>
            ({rowData.number}篇)
          </span>
        </Item>
      </List>
    );
  };

  toArtList = (value) => {
    this.props.history.push({
      pathname: `/layout/my/artListPage/${value.type}/${value.id}`,
    });
  };

  render() {
    const { dataSource } = this.state;

    return (
      <>
        {dataSource ? (
          <ListView
            contentContainerStyle={{ backgroundColor: "#fff" }}
            key={this.state.useBodyScroll ? "0" : "1"}
            ref={(el) => (this.lv = el)}
            dataSource={this.state.dataSource}
            renderFooter={() => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Icon type="loading" />
              </div>
            )}
            renderRow={this.renderRowList()}
            useBodyScroll={this.state.useBodyScroll}
            style={
              this.state.useBodyScroll
                ? {}
                : {
                    height: this.state.height,
                    border: "1px solid #ddd",
                    margin: "5px 0",
                  }
            }
            pullToRefresh={
              <PullToRefresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            onEndReached={this.onEndReached}
            pageSize={5}
          />
        ) : (
          <NoData />
        )}
      </>
    );
  }
}

export default withRouter(CList);
