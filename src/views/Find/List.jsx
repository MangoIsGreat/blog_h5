import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, WingBlank, Flex, Icon } from "antd-mobile";
import NoData from "../../components/NoData";

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${pIndex * NUM_ROWS + i}`);
  }
  return dataArr;
}

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
      originData: [1, 1, 1], // 数据源
      groupList: [1, 1, 1, 1, 1, 1], // 推荐技术团队
    };
  }

  headerData = {
    activityType: [
      {
        type: "招聘",
        icon: "icon-huati",
      },
      {
        type: "话题",
        icon: "icon-gonggao",
      },
      {
        type: "字学",
        icon: "icon-huati",
      },
      {
        type: "活动",
        icon: "icon-gonggao",
      },
    ],
    rankingType: [
      {
        type: "文章榜",
        pic: "../../assets/img/ranking-list01.png",
        icon: "icon-bangdan",
      },
      {
        type: "作者榜",
        pic: "../../assets/img/ranking-list02.png",
        icon: "icon-huangguan",
      },
    ],
  };

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
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
    const { groupList } = this.state;

    return (
      <div className="header-content">
        <div className="content-type">
          {this.headerData.activityType.map((item, index) => {
            return (
              <div key={index} className="content-type-item">
                <div className="item-body">
                  <i className={`iconfont ${item.icon}`}></i>
                  <div className="name">{item.type}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="ranking-list">
          <div className="line"></div>
          {this.headerData.rankingType.map((item, index) => {
            return (
              <div className="ranking-list-item" key={index}>
                <div className="content">
                  <div className="title">
                    <i className={`iconfont ${item.icon}`}></i>
                    <span>&nbsp;{item.type}</span>
                  </div>
                  <div className="desc">每日更新</div>
                </div>
                <img src={item.pic} alt="" className="pic" />
              </div>
            );
          })}
        </div>
        <div className="recommend-group">
          <Flex className="recommend-group-header">
            <Flex.Item className="recommend-group-header-start">
              推荐技术大牛
            </Flex.Item>
            <Flex.Item
              className="recommend-group-header-end"
              align="end"
            ></Flex.Item>
          </Flex>
          <div className="recommend-group-body">
            <div className="recommend-group-body-innerBox">
              {groupList.length > 0 &&
                groupList.map((item, index) => {
                  return (
                    <img
                      key={index}
                      className="group-item"
                      src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/62e7ebab4c6c4546492a231a1619ce2c~300x300.image"
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="hot-recommend">
          <i className="iconfont icon-tubiaozhuanqu-05"></i>&nbsp;热门推荐
        </div>
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
          延迟执行与不可变，系统讲解JavaStream数据处理延迟执行与
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
                橘松JAVA
              </div>
              |<div style={{ padding: "0 0.08rem" }}>1小时前</div>
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
              又写bug呢？当我们线上遇到bug的时候又写bug呢？当我们线上遇到bug的时候又写bug呢？当我们线上遇到bug的时候又写bug呢？当我们线上遇到bug的时候
            </div>
          </div>
          <img
            style={{ width: "0.84rem", height: "0.65rem" }}
            src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28ff1d144fe84758b74a6f444b997279~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:360:240.awebp"
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
              className="iconfont icon-dianzan"
            >
              &nbsp;7
            </i>
            <i style={{ color: "#6C7583" }} className="iconfont icon-pinglun">
              &nbsp;1
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
              后端
            </span>
          </Flex.Item>
        </Flex>
      </WingBlank>
    );
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
