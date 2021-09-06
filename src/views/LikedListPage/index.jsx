import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import style from "./index.module.scss";
import List from "./List";
import IList from "./IList";
import TabsCom from "../../components/TabsCom";
import Header from "../../components/Header";

class LikeList extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [{ title: "文章" }, { title: "动态" }],
      tabStatus: 0,
    };
  }

  onFocus = () => {
    this.props.triggerShowState(true);
  };

  renderTabsContent = () => {
    const { tabStatus } = this.state;

    if (tabStatus === 0) {
      return <List />;
    }

    return <IList />;
  };

  onTabChange = (tab, index) => {
    this.setState({
      tabStatus: index,
    });
  };

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.home}>
        <Header title="赞过的" isBack noBorder />
        {/* tab栏 */}
        <TabsCom
          tabs={tabs}
          tabSize={2}
          renderTabsContent={this.renderTabsContent}
          onChange={this.onTabChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(LikeList);
