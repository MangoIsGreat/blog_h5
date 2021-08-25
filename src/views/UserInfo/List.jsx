import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, Icon, Toast } from "antd-mobile";
import NoData from "../../components/NoData";
import BlogItem from "../../components/BlogItem";
import DynItem from "../../components/DynItem";
import DynamicItem from "./DynamicItem";

const NUM_ROWS = 15; // 页容量
let pageIndex = 1; // 当前页数

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
      pageIndex = 1;

      const { uid } = this.props;

      const params = {
        pageSize: NUM_ROWS,
        pageIndex: pageIndex,
        uid,
      };

      let path = "";
      if (nextProps.type === 0) {
        path = "/author/dynamic";
      } else if (nextProps.type === 1) {
        path = "/author/artlist";
        params.type = "new";
      } else {
        path = "/author/dynlist";
      }

      const listData = await this.$axios.get(path, { params });

      if (listData.error_code !== 0) {
        return Toast.info("数据获取失败", 1.5);
      }

      listData.data.list.forEach((item) => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(listData.data.list),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }
  }

  onRefresh = async () => {
    this.setState({ refreshing: true, isLoading: true });
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
    const newData = await this.genData(++pageIndex);
    this.rData = [...this.rData, ...newData];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  // 获取列表数据
  genData = async () => {
    const { type, uid } = this.props;
    const params = {
      pageSize: NUM_ROWS,
      pageIndex: pageIndex,
      uid,
    };

    let path = "";
    if (type === 0) {
      path = "/author/dynamic";
    } else if (type === 1) {
      path = "/author/artlist";
      params.type = "new";
    } else {
      path = "/author/dynlist";
    }

    const listData = await this.$axios.get(path, { params });

    if (listData.error_code === 0) {
      listData.data.list.forEach((item) => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }

        if (item.Dynamic && item.Dynamic.picUrl) {
          item.picUrl = JSON.parse(item.Dynamic.picUrl);
        }
      });

      return listData.data.list;
    } else {
      Toast.info("数据获取失败", 1.5);
    }
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
    const { type } = this.props;

    return (rowData) => {
      if (type === 0) {
        return <DynamicItem listData={rowData} />;
      } else if (type === 1) {
        return <BlogItem listData={rowData} />;
      } else {
        return <DynItem listData={rowData} />;
      }
    };
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
                <Icon type="loading" />
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
