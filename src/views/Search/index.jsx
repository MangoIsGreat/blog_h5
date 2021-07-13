import React, { Component } from "react";
import style from "./index.module.scss";
import SearchBar from "./components/SearchBar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActionCreator from "../../store/actionCreators/searchActionCreator";

class Search extends Component {
  render() {
    const { isShowSearchPage } = this.props;

    return (
      <div
        style={{ height: isShowSearchPage ? "100vh" : "0" }}
        className={style.search}
      >
        <SearchBar />
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
