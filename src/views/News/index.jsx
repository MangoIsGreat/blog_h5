import React, { Component } from "react";
import style from "./index.module.scss";
import List from "./List";
import TabsCom from "../../components/TabsCom";

class News extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [
        { title: "全部" },
        { title: "行业动态" },
        { title: "软件更新" },
        { title: "编程语言" },
      ],
    };
  }

  renderTabsContent = () => {
    return <List />;
  };

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.news}>
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

export default News;
