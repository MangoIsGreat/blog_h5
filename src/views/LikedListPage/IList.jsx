import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, Icon } from "antd-mobile";
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
      publicInfoData: [1, 1, 1], // 热门推荐数据
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
    if (this.state.isLoading) {
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

  renderRow = () => {
    const imgList = [1, 1, 1];

    return (rowData, sectionID, rowID) => {
      return (
        <div className="list-row">
          <div className="list-row-top">
            <div className="list-row-header">
              <img
                className="avatar"
                src="https://user-gold-cdn.xitu.io/2018/3/1/161e04b44304bed1?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                alt=""
              />
              <div className="list-row-header-content">
                <div className="list-row-header-content-tit">进击的小将</div>
                <div className="list-row-header-content-desc">
                  iOS菜鸡&nbsp;·&nbsp;57分钟前
                </div>
              </div>
            </div>
            <div className="list-row-content">
              今天的走势也符合之前的预期，两市又转换到了普跌行情，从日K线上看，仍然是横盘震荡格局，成交量继续萎缩，表明多空力量都比较谨慎。短期会在3550点附近横盘震荡，既不会持续大涨，也不会持续大跌，结构性行情还会持续，所以我觉得择股更重要！但是对于个股要放低收益预期，不然就是被套。
            </div>
            <div className="list-row-pic">
              {imgList.length > 0 &&
                imgList.map((item, index) => {
                  return (
                    <img
                      className="list-row-pic-item"
                      key={index}
                      src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/152425cab25f49389c7b1ad2964d5833~tplv-k3u1fbpfcp-zoom-mark-crop-v2:460:460:0:0.awebp"
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
