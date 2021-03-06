import React, { Component } from "react";
import style from "./index.module.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import List from "./List";
import Header from "../../components/Header";

class Found extends Component {
  render() {
    return (
      <div className={style.readArticle}>
        <Header title="阅读过的文章" isBack />
        {/* 列表页 */}
        <List />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(Found);
