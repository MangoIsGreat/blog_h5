import React, { Component } from "react";
import style from "./index.module.scss";
import { InputItem } from "antd-mobile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import SearchPage from "../Search/index";
import List from "./List";

class Found extends Component {
  onFocus = () => {
    this.props.triggerShowState(true);
  };

  render() {
    return (
      <div className={style.find}>
        <div className={style.searchBox}>
          <InputItem
            className={style.search}
            placeholder="搜索得到"
            labelNumber={1}
            onFocus={() => this.onFocus()}
          >
            <i className="iconfont icon-fangdajing" />
          </InputItem>
        </div>
        {/* 列表页 */}
        <List />
        {/* 搜索页 */}
        <SearchPage />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(Found);
