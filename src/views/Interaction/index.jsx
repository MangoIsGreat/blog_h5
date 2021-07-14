import React, { Component } from "react";
import style from "./index.module.scss";
import TabsCom from "../../components/TabsCom";
import List from "./List";

class Interaction extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [
        { title: "推荐" },
        { title: "热门" },
        { title: "关注" },
        { title: "上班摸鱼" },
        { title: "内推招聘" },
        { title: "树洞一下" },
        { title: "今天学到了" },
        { title: "一图胜千言" },
        { title: "每日算法题" },
      ],
    };
  }

  renderTabsContent = () => {
    return <List />;
  };

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.interaction}>
        {/* 分类tab部分 */}
        <TabsCom
          tabs={tabs}
          tabSize={4}
          swipeable={false}
          renderTabsContent={this.renderTabsContent}
        />
        <List />
      </div>
    );
  }
}

export default Interaction;
