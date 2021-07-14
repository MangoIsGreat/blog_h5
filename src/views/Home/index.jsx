import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import { WingBlank, InputItem, Tabs } from "antd-mobile";
import style from "./index.module.scss";
import SearchPage from "../Search/index";
import List from "./List";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      classifyActiveTab: 0,
    };
  }

  onFocus = () => {
    this.props.triggerShowState(true);
  };

  tabClick = (tab, index) => {
    this.setState({
      classifyActiveTab: index,
    });
    // Toast.loading("加载中", 60);
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    // this.oldData = [];
    // this.pageIndex = 1;
    // this.setState(
    //   {
    //     classifyActiveTab: index,
    //     isLoading: true,
    //     showNoDataModal: false,
    //     dataSource: this.state.dataSource.cloneWithRows(this.oldData),
    //   },
    //   () => {
    //     if (tab.id == 0) {
    //       this.setState(
    //         {
    //           classDis: true,
    //           categoryid: tab.id,
    //           classifySticky: false,
    //         },
    //         () => {
    //           this.getListData(1, false);
    //         }
    //       );
    //     } else {
    //       this.orderList && this.orderList.scrollTo(0, 0);
    //       this.setState(
    //         {
    //           classDis: false,
    //           categoryid: tab.id,
    //         },
    //         () => {
    //           this.getListData(1, false);
    //         }
    //       );
    //     }
    //   }
    // );
  };

  render() {
    const { classifyActiveTab } = this.state;
    const { isShowSearchPage } = this.props;

    const tabs = [
      { title: "1st Tab" },
      { title: "2nd Tab" },
      { title: "3rd Tab" },
      { title: "4th Tab" },
      { title: "5th Tab" },
      { title: "6th Tab" },
      { title: "7th Tab" },
      { title: "8th Tab" },
      { title: "9th Tab" },
    ];

    return (
      <div className={style.home}>
        <WingBlank className={style.searchBox} size="md">
          <InputItem
            className={style.search}
            placeholder="搜索得到"
            labelNumber={1}
            onFocus={() => this.onFocus()}
          >
            <i className="iconfont icon-fangdajing" />
          </InputItem>
          <i className="iconfont icon-shezhi">&nbsp;标签</i>
        </WingBlank>
        {/* 搜索页 */}
        <SearchPage />
        {/* tab栏 */}
        <Tabs
          tabs={tabs}
          onTabClick={this.tabClick}
          tabBarUnderlineStyle={{
            width: "0.6rem",
            left: `calc(${classifyActiveTab} * 33.333333% + 0.35rem)`,
            border: "1px #00c58e solid",
          }}
          tabBarBackgroundColor="#F9F9F9"
          tabBarActiveTextColor="#00c58e"
          tabBarInactiveTextColor="#A0A6AF"
          renderTabBar={(props) => <Tabs.DefaultTabBar {...props} page={3} />}
        ></Tabs>
        {/* 数据列表 */}
        <List />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isShowSearchPage: state.search.isShowSearchPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
