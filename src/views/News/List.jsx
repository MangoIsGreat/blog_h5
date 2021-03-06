import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, Icon, Toast } from "antd-mobile";
import NoData from "../../components/NoData";
import NewsItem from "../../components/NewsItem";

class List extends Component {
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
      pageIndex: 1, // 页码
      NUM_ROWS: 15, // 页容量
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

  async componentWillReceiveProps(nextProps) {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    if (nextProps.type !== this.props.type) {
      // 重置pageIndex
      this.setState({
        pageIndex: 1,
      });

      const listData = await this.$axios.get("/news/list", {
        params: {
          tag: nextProps.type,
          rankingType: "new",
          pageSize: this.state.NUM_ROWS,
          pageIndex: 1,
          // pageIndex: pageIndex,
        },
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(listData.data.rows),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }
  }

  // 获取列表数据
  genData = async () => {
    const { type } = this.props;
    const listData = await this.$axios.get("/news/list", {
      params: {
        tag: type,
        rankingType: "new",
        pageSize: this.state.NUM_ROWS,
        pageIndex: this.state.pageIndex,
      },
    });

    if (listData.error_code === 0) {
      return listData.data.rows;
    } else {
      Toast.info("数据获取失败", 1.5);
    }
  };

  onRefresh = async () => {
    this.setState({ refreshing: true, isLoading: true, pageIndex: 1 });
    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false,
      isLoading: false,
    });
  };

  onEndReached = async (event) => {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });
    const newData = await this.genData(++this.state.pageIndex);
    this.rData = [...this.rData, ...newData];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  renderSeparator = () => {
    return (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#eff2f5",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED",
        }}
      />
    );
  };

  renderRowList = () => {
    return (rowData, sectionID, rowID) => <NewsItem listData={rowData} />;
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
            dataSource={dataSource}
            renderFooter={() => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {this.state.isLoading ? <Icon type="loading" /> : null}
              </div>
            )}
            renderRow={this.renderRowList()}
            renderSeparator={this.renderSeparator()}
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

export default List;
