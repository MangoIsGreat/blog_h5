import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import { WingBlank, InputItem } from "antd-mobile";
import style from "./index.module.scss";
import SearchPage from "../Search/index";

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  onFocus = () => {
    this.props.triggerShowState(true);
  };

  render() {
    const { isShowSearchPage } = this.props;

    return (
      <div className={style.home}>
        <WingBlank className={style.searchBox} size="md">
          <InputItem
            className={style.search}
            placeholder="搜索得到"
            labelNumber={1}
            onFocus={() => this.onFocus()}
          >
            <i className="iconfont icon-fangdajing" />
          </InputItem>
          <i className="iconfont icon-shezhi">&nbsp;标签</i>
        </WingBlank>
        {/* 搜索页 */}
        <SearchPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isShowSearchPage: state.search.isShowSearchPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
