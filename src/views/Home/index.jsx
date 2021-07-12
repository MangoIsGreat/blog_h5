import React, { Component } from "react";
import { WingBlank, InputItem } from "antd-mobile";
import style from "./index.module.scss";

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  onFocus = () => {
    
  }

  render() {
    const {} = this.state;

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
      </div>
    );
  }
}

export default Home;
