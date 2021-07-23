import React, { Component } from "react";
import style from "./index.module.scss";
import List from "./List";
import TabsCom from "../../components/TabsCom";
import Header from "../../components/Header";

class TagArtList extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [{ title: "热门" }, { title: "最新" }],
    };
  }

  renderTabsContent = () => {
    return <List />;
  };

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.news}>
        <Header title="标签文章列表" isBack />
        <TabsCom
          tabs={tabs}
          tabSize={4}
          swipeable={false}
          renderTabsContent={this.renderTabsContent}
        />
      </div>
    );
  }
}

export default TagArtList;
