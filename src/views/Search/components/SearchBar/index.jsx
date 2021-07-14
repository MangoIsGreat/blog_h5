import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../../../store/actionCreators/searchActionCreator";
import { WingBlank, InputItem } from "antd-mobile";
import styles from "./index.module.scss";
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import Tab from "./tabs";
import History from "./history";
import { setHistory } from "../../../../utils/store";
import List from "./List";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
    };
  }

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

  onTabClick = (tab, index) => {
    console.log("tabclick", tab, index);
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div className={styles.searchBar}>
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
        <Tab onTabClick={this.onTabClick} />
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
