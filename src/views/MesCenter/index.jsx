import React, { Component } from "react";
import Header from "../../components/Header";
import { List } from "antd-mobile";
import style from "./index.module.scss";

const Item = List.Item;

class My extends Component {
  typeList = [
    {
      name: "评论",
      className: "info-list-item",
      icon: "iconfont icon-pinglun",
      color: "#e6a23c",
      path: "/my/messageCenter/comment",
    },
    {
      name: "点赞",
      className: "info-list-item",
      icon: "iconfont icon-dianzan1",
      color: "#2de938",
      path: "/my/messageCenter/dianzan",
    },
    {
      name: "关注",
      className: "info-list-item",
      icon: "iconfont icon-wode",
      color: "#2f6df2",
      path: "/my/messageCenter/attention",
    },
    {
      name: "系统消息",
      className: "info-list-item info-list-item-sys",
      icon: "iconfont icon-xiaoxi",
      color: "#2f6df2",
      path: "/my/messageCenter/system",
    },
  ];

  linkNewPage = (path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className={style.messageCenter}>
        <Header title="消息中心" isBack={true} />
        <List className={style.myList}>
          {this.typeList.map((item, index) => {
            return (
              <Item
                key={index}
                className={item.className}
                onClick={() => this.linkNewPage(item.path)}
                thumb={
                  <i style={{ color: item.color }} className={item.icon}></i>
                }
              >
                {item.name}
              </Item>
            );
          })}
        </List>
      </div>
    );
  }
}

export default My;
