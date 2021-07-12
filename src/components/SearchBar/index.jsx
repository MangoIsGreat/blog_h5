import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank, InputItem } from "antd-mobile";
import styles from "./index.module.scss";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  onChange = (value) => {};

  onSubmit = (value) => {};

  onFocus = () => {
    this.props.switchShowTag(true);
  };

  onBlur = () => {
    this.props.switchShowTag(false);
  };

  render() {
    const { value, showCancelBtn } = this.props;

    return (
      <div className={styles.searchBar}>
        <WingBlank className={styles.searchBox} size="sm">
          <InputItem
            className={styles.search}
            value={value}
            placeholder="搜索得到"
            labelNumber={1}
            onFocus={() => this.onFocus()}
            onChange={() => this.onChange()}
            onBlur={() => this.onBlur()}
          >
            <i className="iconfont icon-fangdajing" />
          </InputItem>
          {!showCancelBtn ? (
            <i className="iconfont icon-shezhi">&nbsp;标签</i>
          ) : (
            <div>取消</div>
          )}
        </WingBlank>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  showCancelBtn: PropTypes.bool.isRequired,
};

export default Search;
