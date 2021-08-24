import React, { Component } from "react";
import { Toast } from "antd-mobile";
import style from "./index.module.scss";
import TabsCom from "../../components/TabsCom";
import List from "./List";

class Interaction extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [],
      tag_type: "",
    };
  }

  componentDidMount() {
    // 获取话题类型
    this.getThemeList();
  }

  getThemeList = async () => {
    const theme = await this.$axios.get("/theme/list");

    if (theme.error_code !== 0) {
      return Toast.info("数据请求失败", 1.5);
    }

    theme.data.forEach((item) => {
      item.title = item.themeName;
      item.key = item.id;
    });

    this.setState({
      tabs: theme.data,
    });
  };

  onChange = (tab, index) => {
    this.setState({
      tag_type: tab.themeName,
    });
  };

  renderTabsContent = () => {
    const { tag_type } = this.state;

    return <List type={tag_type} />;
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
          onChange={this.onChange}
          renderTabsContent={this.renderTabsContent}
        />
        {/* 写动态快捷入口 */}
        <div className={style.write}>
          <i className="iconfont icon-pinglun1"></i>
        </div>
      </div>
    );
  }
}

export default Interaction;
