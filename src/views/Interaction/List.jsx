import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, WingBlank, Flex, Icon } from "antd-mobile";

const data = [
  {
    img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
    title: "Meet hotel",
    des: "不是所有的兼职汪都需要风吹日晒",
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
    title: "McDonald's invites you",
    des: "不是所有的兼职汪都需要风吹日晒",
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",
    title: "Eat the week",
    des: "不是所有的兼职汪都需要风吹日晒",
  },
];
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
      hotListData: [1, 1, 1],
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

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

  render() {
    const { hotListData } = this.state;

    // 每行数据下方分割内容
    const separator = (sectionID, rowID) => (
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

    // let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      //   if (index < 0) {
      //     index = data.length - 1;
      //   }
      //   const obj = data[index--];
      return (
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

    const header = (
      <div style={{height: "1.16rem", overflowX: "auto"}}>
        <div style={{height: "100%", width: "1000px"}}></div>
      </div>
    );

    return (
      <div>
        <ListView
          contentContainerStyle={{ backgroundColor: "#fff" }}
          key={this.state.useBodyScroll ? "0" : "1"}
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderHeader={() => header}
          renderFooter={() => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Icon type="loading" />
            </div>
          )}
          renderRow={row}
          renderSeparator={separator}
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
      </div>
    );
  }
}

export default List;
