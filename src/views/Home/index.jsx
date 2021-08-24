import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import { InputItem, Toast } from "antd-mobile";
import style from "./index.module.scss";
import SearchPage from "../Search/index";
import List from "./List";
import TabsCom from "../../components/TabsCom";

class Home extends Component {
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

  onFocus = () => {
    this.props.triggerShowState(true);
  };

  onChange = (tab, index) => {
    this.setState({
      tag_type: tab.tag_type,
    });
  };

  renderTabsContent = () => {
    const { tag_type } = this.state;

    return <List type={tag_type} />;
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
        </div>
        {/* 搜索页 */}
        <SearchPage />
        {/* tab栏 */}
        <TabsCom
          tabs={tabs}
          tabSize={5}
          swipeable={true}
          renderTabsContent={this.renderTabsContent}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(Home);
