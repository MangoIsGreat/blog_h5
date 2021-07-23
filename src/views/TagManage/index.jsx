import React, { Component } from "react";
import style from "./index.module.scss";
import List from "./List";
import TabsCom from "../../components/TabsCom";
import Header from "../../components/Header";

class News extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [{ title: "标签管理" }, { title: "已关注标签" }],
    };
  }

  renderTabsContent = () => {
    return <List />;
  };

  onTabChange = () => {};

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.news}>
        <Header title="标签管理" isBack />
        <TabsCom
          tabs={tabs}
          tabSize={2}
          swipeable={false}
          renderTabsContent={this.renderTabsContent}
          onChange={this.onTabChange}
        />
      </div>
    );
  }
}

export default News;
