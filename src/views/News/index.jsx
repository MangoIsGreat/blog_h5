import React, { Component } from "react";
import { Toast } from "antd-mobile";
import style from "./index.module.scss";
import List from "./List";
import TabsCom from "../../components/TabsCom";

class News extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [],
      tag_type: "", // 当前选中的文章类型
    };
  }

  componentDidMount() {
    // 获取tabs信息
    this.getTabs();
  }

  getTabs = async () => {
    const data = await this.$axios.get("/newstype/list");

    if (data.error_code === 0) {
      const listData = data.data.rows;

      listData.forEach((item) => {
        item.title = item.tag_name;
        item.key = item.tag_type;
      });

      this.setState({
        tabs: listData,
        tag_type: listData[0].tag_type,
      });
    } else {
      Toast.info("数据请求失败", 1.5);
    }
  };

  renderTabsContent = () => {
    const { tag_type } = this.state;

    return <List type={tag_type} />;
  };

  onChange = (tab, index) => {
    this.setState({
      tag_type: tab.tag_type,
    });
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
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default News;
