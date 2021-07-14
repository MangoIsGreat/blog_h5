import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import { InputItem } from "antd-mobile";
import style from "./index.module.scss";
import SearchPage from "../Search/index";
import List from "./List";
import TabsCom from "../../components/TabsCom";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [
        { title: "关注" },
        { title: "推荐" },
        { title: "热榜" },
        { title: "头条精选" },
        { title: "后端" },
        { title: "前端" },
        { title: "Android" },
        { title: "iOS" },
        { title: "人工智能" },
      ],
    };
  }

  onFocus = () => {
    this.props.triggerShowState(true);
  };

  renderTabsContent = () => {
    return <List />;
  };

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.home}>
        <div className={style.homeSearchBox}>
          <InputItem
            className={style.search}
            placeholder="搜索得到"
            labelNumber={1}
            onFocus={() => this.onFocus()}
          >
            <i className="iconfont icon-fangdajing" />
          </InputItem>
          <i className="iconfont icon-shezhi">&nbsp;标签</i>
        </div>
        {/* 搜索页 */}
        <SearchPage />
        {/* tab栏 */}
        <TabsCom
          tabs={tabs}
          tabSize={5}
          renderTabsContent={this.renderTabsContent}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(Home);
