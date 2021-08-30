import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, ListView, Icon, Toast, Button } from "antd-mobile";
import NoData from "../../components/NoData";
import style from "./index.module.scss";
import { withRouter } from "react-router-dom";

// const NUM_ROWS = 20;
// let pageIndex = 1;

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
      pageIndex: 1,
      NUM_ROWS: 20,
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

  // 获取列表数据
  genData = async () => {
    const listData = await this.$axios.get("/author/ranking", {
      params: {
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

  // 进入用户信息页
  toUserPage = (id) => {
    this.props.history.push(`/my/userInfo/${id}`);
  };

  // 关注
  follow = async (id) => {
    const data = await this.$axios.post("/fans/follow", {
      leader: id,
    });

    if (data.error_code !== 0) {
      return Toast.info("操作失败!", 0.3);
    }

    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false,
      isLoading: false,
    });
  };

  renderRowList = () => {
    return (rowData) => (
      <div
        onClick={() => this.toUserPage(rowData.id)}
        className={style.listItem}
      >
        <img className={style.avatar} src={rowData.avatar} alt="" />
        <div className={style.content}>
          <div className={style.user}>
            <div>
              <div className={style.name}>{rowData.nickname}</div>
              <div className={style.profession}>{rowData.profession}</div>
            </div>
            <Button onClick={() => this.follow(rowData.id)} inline size="small">
              <span
                style={{
                  display: rowData.isAttention ? "none" : "inline",
                  color: "#00c58e",
                }}
              >
                关注
              </span>
              <span
                style={{ display: rowData.isAttention ? "inline" : "none" }}
              >
                已关注
              </span>
            </Button>
          </div>
          <div className={style.bottom}>
            获得&nbsp;{rowData.blogLikeNum}&nbsp;赞&nbsp;·&nbsp;
            {rowData.blogReadNum}
            &nbsp;阅读
          </div>
        </div>
      </div>
    );
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

export default withRouter(List);
