import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { PullToRefresh, ListView, Flex, Icon, Toast } from "antd-mobile";
import NoData from "../../components/NoData";
import BlogItem from "../../components/BlogItem";

class List extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => true,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      hotListData: [],
      pageIndex: 1,
      NUM_ROWS: 15,
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

    this.genHotData();
  }

  async componentWillReceiveProps(nextProps) {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    if (nextProps.type !== this.props.type) {
      // 重置pageIndex
      this.setState({
        pageIndex: 1,
      });

      const listData = await this.$axios.get("/blog/list", {
        params: {
          tag: nextProps.type,
          rankingType: "new",
          pageSize: this.state.NUM_ROWS,
          pageIndex: 1,
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

  // 获取列表数据
  genData = async () => {
    const { type } = this.props;
    const listData = await this.$axios.get("/blog/list", {
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

  // 获取热门推荐数据
  genHotData = async () => {
    const { type } = this.props;

    if (type !== 10000) return;

    const listData = await this.$axios.get("/blog/list", {
      params: {
        tag: type,
        rankingType: "hot",
        pageSize: 3,
        pageIndex: 1,
      },
    });

    if (listData.error_code === 0) {
      this.setState({
        hotListData: listData.data.rows,
      });
    } else {
      Toast.info("热门推荐数据获取失败", 1.5);
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

  toHotList = () => {
    this.props.history.push("/article/ranking");
  };

  renderHeader = () => {
    const { hotListData } = this.state;

    return (
      <div style={{ borderBottom: "0.07rem solid #EFF2F5" }}>
        <Flex
          style={{
            height: "0.4rem",
            borderBottom: "0.01rem solid #EBEEF2",
            paddingBottom: "0.1rem",
            padding: "0 0.2rem",
            boxSizing: "border-box",
          }}
        >
          <Flex.Item>
            <i
              style={{ color: "#EB534C" }}
              className="iconfont icon-tubiaozhuanqu-05"
            ></i>
            &nbsp;热门推荐
          </Flex.Item>
          <Flex.Item align="end">
            <div onClick={() => this.toHotList()}>
              文章榜&nbsp;
              <i className="iconfont icon-xiangyou"></i>
            </div>
          </Flex.Item>
        </Flex>
        {hotListData.length > 0 &&
          hotListData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => this.props.history.push(`/article/${item.id}`)}
                style={{
                  display: "flex",
                  padding: "0.2rem 0.2rem",
                  boxSizing: "border-box",
                  borderBottom: "0.01rem solid #EBEEF2",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      width: "calc(100vw - 1.2rem)",
                      fontSize: "0.16rem",
                      color: "#000206",
                      lineHeight: "0.24rem",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.12rem",
                      color: "#A0A6AE",
                      lineHeight: "0.24rem",
                    }}
                  >
                    {item.blogLikeNum}&nbsp;赞&nbsp;·&nbsp;{item.commentNum}
                    &nbsp;评论&nbsp;·&nbsp;{item.User && item.User.nickname}
                  </div>
                </div>
                <div
                  style={{
                    width: "0.65rem",
                    height: "0.65rem",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url('${item.titlePic}')`,
                  }}
                ></div>
              </div>
            );
          })}
      </div>
    );
  };

  likeBlog = async (id) => {
    const data = await this.$axios.post("/blike/like", {
      blog: id,
    });

    if (data.error_code !== 0) {
      return Toast.info("操作失败!", 0.3);
    }

    const listData = this.state.dataSource._dataBlob.s1;

    if (data.data === "ok") {
      listData.forEach((item) => {
        if (item.id === id) {
          item.isLike = true;
          item.blogLikeNum++;
        }
      });
    } else if (data.data === "cancel") {
      listData.forEach((item) => {
        if (item.id === id) {
          item.isLike = false;
          item.blogLikeNum--;
        }
      });
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(listData),
    });
  };

  renderRowList = () => {
    return (rowData) => (
      <BlogItem likeBlog={this.likeBlog} listData={rowData} />
    );
  };

  render() {
    const { dataSource } = this.state;
    const { type } = this.props;

    const renderHeader = type === 10000 ? this.renderHeader() : null;

    return (
      <>
        {dataSource ? (
          <ListView
            contentContainerStyle={{ backgroundColor: "#fff" }}
            key={this.state.useBodyScroll ? "0" : "1"}
            ref={(el) => (this.lv = el)}
            dataSource={dataSource}
            renderHeader={() => renderHeader}
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

export default withRouter(List);
