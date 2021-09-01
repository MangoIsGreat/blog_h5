import React, { Component } from "react";
import style from "./index.module.scss";
import { SearchBar } from "antd-mobile";
import List from "./List";

class Found extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHot: true, // 展示热门推荐
      searchVal: "",
    };
  }

  onSubmit = (val) => {
    this.setState({
      showHot: false,
      searchVal: val,
    });
  };

  onCancel = () => {
    window.location.reload();
  };

  render() {
    const { showHot, searchVal } = this.state;

    return (
      <div className={style.find}>
        <div className={style.searchBox}>
          <SearchBar
            className={style.search}
            placeholder="搜索得到"
            maxLength={30}
            onSubmit={(e) => this.onSubmit(e)}
            onCancel={() => this.onCancel()}
          />
        </div>
        {/* 列表页 */}
        <List showHot={showHot} searchVal={searchVal} />
      </div>
    );
  }
}

export default Found;
