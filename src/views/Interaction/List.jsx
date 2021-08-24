import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, Icon, Toast } from "antd-mobile";
import NoData from "../../components/NoData";
import { relativeTime } from "../../utils/day";

const NUM_ROWS = 20;
let pageIndex = 1;

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
      publicInfoData: [], // 热门推荐数据
      originData: [1, 1, 1], // 数据源
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

    // 获取热门留言
    this.getFavList();
  }

  async componentWillReceiveProps(nextProps) {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    if (nextProps.type !== this.props.type) {
      // 重置pageIndex
      pageIndex = 1;

      const listData = await this.$axios.get("/dynamic/list", {
        params: {
          pageSize: NUM_ROWS,
          pageIndex: pageIndex,
          theme: nextProps.type,
          type: "",
        },
      });

      if (listData.error_code === 0) {
        listData.data.forEach((item) => {
          if (item.picUrl) {
            item.picUrl = JSON.parse(item.picUrl);
          }
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(listData.data),
          height: hei,
          refreshing: false,
          isLoading: false,
        });
      } else {
        Toast.info("数据获取失败", 1.5);
      }
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
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({ isLoading: true });
    this.newData = await this.genData(++pageIndex);
    this.rData = [...this.rData, ...this.newData];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  // 获取列表数据
  genData = async () => {
    const { type } = this.props;

    const listData = await this.$axios.get("/dynamic/list", {
      params: {
        pageSize: NUM_ROWS,
        pageIndex: pageIndex,
        theme: type,
        type: "",
      },
    });

    if (listData.error_code === 0) {
      listData.data.forEach((item) => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }
      });

      return listData.data;
    } else {
      Toast.info("数据获取失败", 1.5);
    }
  };

  // 获取热门留言
  getFavList = async () => {
    const listData = await this.$axios.get("/dynamic/favlist");

    if (listData.error_code === 0) {
      listData.data.forEach((item) => {
        if (item.picUrl) {
          item.picUrl = JSON.parse(item.picUrl);
        }
      });

      this.setState({
        publicInfoData: listData.data,
      });
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

  renderHeader = () => {
    const { publicInfoData } = this.state;

    return (
      <div className="swiper-box">
        <div className="swiper-innerBox">
          {publicInfoData.length > 0 &&
            publicInfoData.map((item, index) => {
              return (
                <div className="swiper-item" key={index}>
                  <div className="swiper-item-innerBox">
                    <div className="content">
                      <div className="title">
                        <span className="tag">热</span>
                        {item.content}
                      </div>
                      <div className="line">
                        点赞{item.likeNum}&nbsp;·&nbsp;评论{item.commNum}
                      </div>
                    </div>
                    <div
                      className="pic"
                      style={{
                        backgroundImage: `url('${item.picUrl[0]}')`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  renderRow = () => {
    const imgList = [1, 1, 1];

    return (rowData, sectionID, rowID) => {
      return (
        <div className="list-row">
          <div className="list-row-top">
            <div className="list-row-header">
              <img
                className="avatar"
                src={rowData.userInfo && rowData.userInfo.avatar}
                alt=""
              />
              <div className="list-row-header-content">
                <div className="list-row-header-content-tit">
                  {rowData.userInfo && rowData.userInfo.nickname}
                </div>
                <div className="list-row-header-content-desc">
                  {rowData.userInfo && rowData.userInfo.profession}
                  &nbsp;·&nbsp;{relativeTime(rowData.created_at)}
                </div>
              </div>
            </div>
            <div className="list-row-content">
              <span
                style={{
                  color: "#00c58e",
                  display: rowData.theme ? "inline" : "none",
                }}
              >
                #{rowData.theme}#
              </span>
              {rowData.content}
            </div>
            <div className="list-row-pic">
              {rowData.picUrl &&
                rowData.picUrl.length > 0 &&
                rowData.picUrl.map((item, index) => {
                  return (
                    <img
                      className="list-row-pic-item"
                      key={index}
                      src={item}
                      alt=""
                    />
                  );
                })}
            </div>
          </div>
          <div className="list-row-bottom">
            <i className="iconfont icon-dianzan">&nbsp;点赞</i>
            <i className="iconfont icon-pinglun">&nbsp;评论</i>
            <i className="iconfont icon-fenxiang">&nbsp;分享</i>
          </div>
        </div>
      );
    };
  };

  render() {
    const { originData } = this.state;

    return (
      <>
        {originData ? (
          <ListView
            contentContainerStyle={{ backgroundColor: "#fff" }}
            key={this.state.useBodyScroll ? "0" : "1"}
            ref={(el) => (this.lv = el)}
            dataSource={this.state.dataSource}
            renderHeader={() => this.renderHeader()}
            renderFooter={() => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Icon type="loading" />
              </div>
            )}
            renderRow={this.renderRow()}
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
