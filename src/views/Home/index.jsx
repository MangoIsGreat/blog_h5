import React, { Component } from "react";
import { Toast, SearchBar } from "antd-mobile";
import style from "./index.module.scss";
import List from "./List";
import TabsCom from "../../components/TabsCom";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [],
      tag_type: "", // 当前选中的文章类型
      showHot: true, // 展示热门推荐
      searchVal: "",
    };
  }

  componentDidMount() {
    // 获取tabs信息
    this.getTabs();
  }

  getTabs = async () => {
    const data = await this.$axios.get("/tag/list");

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

  onChange = (tab) => {
    this.setState({
      tag_type: tab.tag_type,
    });
  };

  onCancel = () => {
    window.location.reload();
  };

  renderTabsContent = () => {
    const { tag_type, showHot, searchVal } = this.state;

    return <List type={tag_type} showHot={showHot} searchVal={searchVal} />;
  };

  onSubmit = (val) => {
    this.setState({
      showHot: false,
      searchVal: val,
    });
  };

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.home}>
        <div className={style.homeSearchBox}>
          <SearchBar
            className={style.search}
            placeholder="搜索得到"
            maxLength={30}
            onSubmit={(e) => this.onSubmit(e)}
            onCancel={() => this.onCancel()}
          />
        </div>
        {/* tab栏 */}
        <TabsCom
          tabs={tabs}
          tabSize={5}
          renderTabsContent={this.renderTabsContent}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Home;
