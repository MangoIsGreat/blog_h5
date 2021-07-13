import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../../../store/actionCreators/searchActionCreator";
import { WingBlank, InputItem, Flex } from "antd-mobile";
import styles from "./index.module.scss";
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import Tab from "./tabs";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onChange = (value) => {};

  onSubmit = () => {};

  onFocus = () => {};

  onBlur = () => {};

  cancel = () => {
    this.props.triggerShowState(false);
  };

  onTabClick = (tab, index) => {
    console.log("tabclick", tab, index);
  };

  render() {
    const { value } = this.props;

    return (
      <div className={styles.searchBar}>
        <WingBlank className={styles.searchBox} size="md">
          <Form className={styles.search} onSubmit={() => this.onSubmit()}>
            <InputItem
              value={value}
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
        <WingBlank size="lg" className={styles.history}>
          <Flex style={{ height: "100%" }}>
            <Flex.Item>搜索历史</Flex.Item>
            <Flex.Item align="end">
              <i className="iconfont icon-shezhi"></i>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  showCancelBtn: PropTypes.bool.isRequired,
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
