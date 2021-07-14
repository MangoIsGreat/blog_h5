import React, { Component } from "react";
import style from "./index.module.scss";
import classNames from "classnames";

class Tab extends Component {
  constructor() {
    super();

    this.state = {
      actIndex: 0,
    };
  }

  tabs = [
    { title: "综合", sub: 0 },
    { title: "文章", sub: 1 },
    { title: "资讯", sub: 2 },
    { title: "用户", sub: 3 },
  ];

  switchTab = (item, index) => {
    this.setState(
      {
        actIndex: index,
      },
      () => {
        this.props.onTabClick(item, index);
      }
    );
  };

  render() {
    const { actIndex } = this.state;

    return (
      <div className={style.tag}>
        {this.tabs.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => this.switchTab(item, index)}
              className={classNames("tag-item", {
                active: item.sub === actIndex,
              })}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tab;
