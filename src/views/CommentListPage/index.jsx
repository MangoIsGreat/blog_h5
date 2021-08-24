import React, { Component } from "react";
import { ListView } from "antd-mobile";
import ReactDOM from "react-dom";
import Header from "../../components/Header";
import style from "./index.module.scss";

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

class CommentListPage extends Component {
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
      originData: [1, 1, 1], // 数据源
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

  render() {
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div className={style.listItemWrapper} key={rowID}>
          <img
            className={style.avatar}
            src="https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
            alt=""
          />
          <div className={style.listItemContent}>
            <div className={style.listItemContentTitle}>
              <span className={style.name}>稀土君</span>评论了你的文章
              <span className={style.article}>
                列举几种常见的前端代理方案列举几种常见的前端代理方案
              </span>
            </div>
            <div className={style.listItemContentContent}>
              人生苦短，珍惜时间，赶紧学习。人生苦短，珍惜时间，赶紧学习。人生苦短，珍惜时间，赶紧学习。
            </div>
            <div className={style.listItemContentTime}>2月前</div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <Header title="评论" isBack />
        <ListView
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>
              {this.state.isLoading ? "Loading..." : "Loaded"}
            </div>
          )}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: "auto",
          }}
          pageSize={4}
          onScroll={() => {
            console.log("scroll");
          }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

export default CommentListPage;
