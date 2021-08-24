import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  PullToRefresh,
  ListView,
  WingBlank,
  Flex,
  Icon,
  Toast,
} from "antd-mobile";
import NoData from "../../components/NoData";
import { relativeTime } from "../../utils/day";

const NUM_ROWS = 20; // 页容量
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
      hotListData: [],
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
      pageIndex = 1;

      const listData = await this.$axios.get("/blog/list", {
        params: {
          tag: nextProps.type,
          rankingType: "new",
          pageSize: NUM_ROWS,
          pageIndex: pageIndex,
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
    const { type } = this.props;
    const listData = await this.$axios.get("/blog/list", {
      params: {
        tag: type,
        rankingType: "new",
        pageSize: NUM_ROWS,
        pageIndex: pageIndex,
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
            文章榜&nbsp;
            <i className="iconfont icon-xiangyou"></i>
          </Flex.Item>
        </Flex>
        {hotListData.length > 0 &&
          hotListData.map((item, index) => {
            return (
              <div
                key={index}
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

  renderRowList = () => {
    return (rowData, sectionID, rowID) => (
      <WingBlank
        size="md"
        style={{
          backgroundColor: "#fff",
          padding: "0.15rem 0",
        }}
      >
        <div
          style={{
            width: "calc(100vw - 0.4rem)",
            marginBottom: "0.05rem",
            fontSize: "0.16rem",
            color: "#222528",
            fontWeight: "600",
            lineHeight: "0.22rem",
          }}
        >
          {rowData.title}
        </div>
        <div style={{ display: "flex", marginBottom: "0.08rem" }}>
          <div style={{ flex: 1, paddingRight: "0.08rem" }}>
            <div
              style={{
                display: "flex",
                marginBottom: "0.05rem",
                color: "#6C7584",
                fontSize: "0.12rem",
                lineHeight: "0.16rem",
              }}
            >
              <div
                style={{
                  paddingRight: "0.08rem",
                }}
              >
                {rowData.User && rowData.User.nickname}
              </div>
              |
              <div style={{ padding: "0 0.08rem" }}>
                {relativeTime(rowData.created_at)}
              </div>
            </div>
            <div
              style={{
                color: "#495261",
                fontSize: "0.14rem",
                lineHeight: "0.21rem",
                wordBreak: "break-all",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {rowData.description}
            </div>
          </div>
          <img
            style={{
              width: "0.84rem",
              height: "0.65rem",
              display: rowData.titlePic ? "block" : "none",
            }}
            src={rowData.titlePic}
            alt=""
          />
        </div>
        <Flex
          style={{
            fontSize: "0.12rem",
            color: "#6C7583",
          }}
        >
          <Flex.Item>
            <i
              style={{ marginRight: "0.13rem", color: "#6C7583" }}
              className="iconfont icon-yanjing"
            >
              &nbsp;{rowData.blogReadNum}
            </i>
            <i
              style={{ marginRight: "0.13rem", color: "#6C7583" }}
              className="iconfont icon-dianzan"
            >
              &nbsp;{rowData.blogLikeNum}
            </i>
            <i style={{ color: "#6C7583" }} className="iconfont icon-pinglun">
              &nbsp;{rowData.commentNum}
            </i>
          </Flex.Item>
          <Flex.Item align="end">
            <span
              style={{
                padding: "0.05rem 0.06rem",
                backgroundColor: "#F4F5F5",
                borderRadius: "0.05rem",
              }}
            >
              {rowData.Tag && rowData.Tag.tagName}
            </span>
          </Flex.Item>
        </Flex>
      </WingBlank>
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
