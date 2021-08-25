import React, { Component } from "react";
import style from "./index.module.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";
import List from "./List";
import Header from "../../components/Header";

class ArtListPage extends Component {
  render() {
    const { type, id } = this.props.match.params;

    return (
      <div className={style.artListPage}>
        <Header title={`收藏集 ${type} 文章列表`} isBack />
        {/* 列表页 */}
        <List cId={id} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(ArtListPage));
