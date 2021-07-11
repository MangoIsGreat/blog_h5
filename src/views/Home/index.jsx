import React, { Component } from "react";
import Search from "../../components/SearchBar";
import style from "./index.module.scss";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: "",
      showCancelBtn: false,
    };
  }

  switchShowTag = (status) => {
    this.setState({
      showCancelBtn: status,
    });
  };

  render() {
    const { showCancelBtn, searchValue } = this.state;

    return (
      <div className={style.root}>
        <Search
          switchShowTag={this.switchShowTag}
          value={searchValue}
          showCancelBtn={showCancelBtn}
        />
      </div>
    );
  }
}

export default Home;
