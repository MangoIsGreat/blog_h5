import React from "react";
import PropTypes from "prop-types";
import { SearchBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import styles from "./index.module.scss";

function Search({ value, showCancelBtn, switchShowTag }) {
  const onChange = (value) => {};

  const onSubmit = (value) => {};

  const onFocus = () => {
    switchShowTag(true);
  };

  const onBlur = () => {
    switchShowTag(false);
  };

  console.log(!showCancelBtn);

  return (
    <div className={styles.searchBar}>
      <SearchBar
        className={styles.search}
        value={value}
        placeholder="搜索得到"
        onSubmit={(value) => onSubmit()}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        onCancel={() => console.log("onCancel")}
        showCancelButton={showCancelBtn}
        onChange={() => onChange()}
        cancelText={
          <i className={`iconfont icon-shezhi`}>&nbsp;标签</i>
        }
      />
      {/* <i
        style={{ display: !showCancelBtn ? "block" : "none" }}
        className={`iconfont icon-shezhi ${styles.tag}`}
      >
        &nbsp;标签
      </i> */}
    </div>
  );
}

Search.propTypes = {
  value: PropTypes.string,
  showCancelBtn: PropTypes.bool.isRequired,
};

export default withRouter(Search);
