import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import { WingBlank, InputItem, Tabs } from "antd-mobile";
import styles from "./index.module.scss";
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import History from "./history";
import { setHistory } from "../../utils/store";
import List from "./List";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      classifyActiveTab: 0,
    };
  }

  tabs = [
    { title: "综合" },
    { title: "文章" },
    { title: "资讯" },
    { title: "用户" },
    { title: "" },
  ];

  componentDidMount() {}

  onChange = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  onSubmit = () => {
    // 保存历史记录
    setHistory(this.state.searchValue);
  };

  onFocus = () => {};

  onBlur = () => {};

  cancel = () => {
    this.props.triggerShowState(false);
  };

  tabClick = (tab, index) => {
    this.setState({
      classifyActiveTab: index,
    });
  };

  render() {
    const { searchValue, classifyActiveTab } = this.state;
    const { isShowSearchPage } = this.props;

    return (
      <div
        className={styles.searchBar}
        style={{ height: isShowSearchPage ? "100vh" : "0", overflow: "auto" }}
      >
        <WingBlank className={styles.searchBox} size="md">
          <Form className={styles.search} onSubmit={() => this.onSubmit()}>
            <InputItem
              value={searchValue}
              placeholder="搜索得到"
              labelNumber={1}
              onFocus={() => this.onFocus()}
              onChange={(value) => this.onChange(value)}
              onBlur={() => this.onBlur()}
            >
              <i className="iconfont icon-fangdajing" />
            </InputItem>
          </Form>
          <div onClick={this.cancel} className={styles.cancel}>
            取消
          </div>
        </WingBlank>
        {/* tab栏 */}
        <div className={styles.tabs}>
          <Tabs
            tabs={this.tabs}
            onTabClick={this.tabClick}
            tabBarUnderlineStyle={{
              width: "0.78rem",
              left: `calc(${classifyActiveTab} * 20%)`,
              border: "1px #00c58e solid",
            }}
            tabBarBackgroundColor="#F9F9F9"
            tabBarActiveTextColor="#00c58e"
            tabBarInactiveTextColor="#A0A6AF"
            renderTabBar={(props) => <Tabs.DefaultTabBar {...props} page={5} />}
          ></Tabs>
        </div>
        {/* 历史面板 */}
        {/* <History /> */}
        {/* 数据列表 */}
        <List />
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    isShowSearchPage: state.search.isShowSearchPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default withFormik({})(
  connect(mapStateToProps, mapDispatchToProps)(Search)
);
