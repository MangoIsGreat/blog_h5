import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, Flex, Icon, Toast } from "antd-mobile";
import NoData from "../../components/NoData";
import pic1 from "../../assets/img/ranking-list01.png";
import pic2 from "../../assets/img/ranking-list02.png";
import BlogItem from "../../components/BlogItem";

const NUM_ROWS = 15;
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
      groupList: [], // 推荐技术团队
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
        pic: "pic1",
        icon: "icon-bangdan",
      },
      {
        type: "作者榜",
        pic: "pic2",
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

  async componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      height: hei,
      refreshing: false,
      isLoading: false,
    });

    // 获取推荐技术大牛
    this.getRecommend();
  }

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

  // 获取推荐技术大牛
  getRecommend = async () => {
    const data = await this.$axios.get("/author/ranking", {
      params: {
        pageSize: 6,
        pageIndex: 1,
      },
    });

    if (data.error_code === 0) {
      this.setState({
        groupList: data.data.rows,
      });
    } else {
      Toast.info("数据获取失败", 1.5);
    }
  };

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

  onActive = () => {
    return Toast.info("需求正在规划中，敬请期待！", 1.5);
  };

  renderHeader = () => {
    const { groupList } = this.state;

    return (
      <div className="header-content">
        <div className="content-type">
          {this.headerData.activityType.map((item, index) => {
            return (
              <div
                onClick={this.onActive}
                key={index}
                className="content-type-item"
              >
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
                <img
                  src={item.pic === "pic1" ? pic1 : pic2}
                  alt=""
                  className="pic"
                />
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
                    <img key={index} className="group-item" src={item.avatar} />
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
    return (rowData, sectionID, rowID) => <BlogItem listData={rowData} />;
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
