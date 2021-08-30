import React, { Component } from "react";
import style from "./index.module.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import List from "./List";
import Header from "../../components/Header";

class Collection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.collection}>
        <Header title="收藏集" isBack />
        {/* 列表页 */}
        <List />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(Collection);
