import React, { Component } from "react";
import style from "./index.module.scss";
import List from "./List";
import Header from "../../components/Header";

class AuthorRanking extends Component {
  render() {
    return (
      <div className={style.authorRanking}>
        <Header title="作者榜" isBack />
        {/* 列表页 */}
        <List />
      </div>
    );
  }
}

export default AuthorRanking;
