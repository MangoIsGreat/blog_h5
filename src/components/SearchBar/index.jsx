import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank, InputItem } from "antd-mobile";
import styles from "./index.module.scss";
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import Tab from "./tabs";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onChange = (value) => {
    this.props.searchInput(value);
  };

  onSubmit = () => {
    this.props.search();
  };

  onFocus = () => {
    this.props.switchShowTag(true);
  };

  onBlur = () => {
    this.props.switchShowTag(false);
  };

  onTabClick = (tab, index) => {
    console.log("tabclick", tab, index);
  };

  render() {
    const { value, showCancelBtn } = this.props;

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
          {!showCancelBtn ? (
            <i className="iconfont icon-shezhi">&nbsp;标签</i>
          ) : (
            <div className={styles.cancel}>取消</div>
          )}
        </WingBlank>
        {/* tab栏 */}
        <Tab onTabClick={this.onTabClick} />
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  showCancelBtn: PropTypes.bool.isRequired,
};

export default withFormik({})(Search);
