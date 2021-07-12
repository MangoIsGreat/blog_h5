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

  searchInput = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  search = () => {
    console.log("搜索搜索");
  };

  render() {
    const { showCancelBtn, searchValue } = this.state;

    return (
      <div className={style.root}>
        <Search
          switchShowTag={this.switchShowTag}
          searchInput={this.searchInput}
          search={this.search}
          value={searchValue}
          showCancelBtn={showCancelBtn}
        />
      </div>
    );
  }
}

export default Home;
