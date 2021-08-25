import React, { Component } from "react";
import style from "./index.module.scss";
import List from "./List";
import Header from "../../components/Header";

class TagArtList extends Component {
  render() {
    const { type, name } = this.props.match.params;

    return (
      <div className={style.news}>
        <Header title={name} isBack />
        <List type={type} />
      </div>
    );
  }
}

export default TagArtList;
