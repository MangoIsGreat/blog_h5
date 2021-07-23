import React, { Component } from "react";
import Header from "../../components/Header";
import { List, Modal } from "antd-mobile";
import style from "./index.module.scss";

const Item = List.Item;
const Brief = Item.Brief;

const alert = Modal.alert;

class My extends Component {
  linkNewPage = (path) => {
    this.props.history.push(path);
  };

  logOut = () => {
    alert("您确定要退出吗？", "", [
      {
        text: "取消",
        onPress: () => console.log("cancel"),
        style: "default",
      },
      { text: "确定", onPress: () => console.log("ok") },
    ]);
  };

  render() {
    return (
      <div className={style.my}>
        <Header title="我的" />
        <List className={style.myList}>
          <Item
            className={style.author}
            arrow="horizontal"
            thumb="https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
            multipleLine
            onClick={() => this.linkNewPage("/layout/my/userInfo")}
          >
            <div className="name">橘猫很方</div> <Brief>前端开发工程师</Brief>
          </Item>
          <Item
            onClick={() => this.linkNewPage("/layout/my/messageCenter")}
            thumb={
              <i
                style={{ color: "#3274F6" }}
                className="iconfont icon-xiaoxi"
              ></i>
            }
          >
            消息中心
          </Item>
          <Item
            onClick={() => this.linkNewPage("/layout/my/likedList")}
            extra="180篇"
            thumb={
              <i
                style={{ color: "#66C439" }}
                className="iconfont icon-dianzan1"
              ></i>
            }
          >
            我赞过的
          </Item>
          <Item
            onClick={() => this.linkNewPage("/layout/my/collection")}
            extra="20个"
            thumb={
              <i
                style={{ color: "#f6c55f" }}
                className="iconfont icon-xingxing"
              ></i>
            }
          >
            收藏集
          </Item>
          <Item
            onClick={() => this.linkNewPage("/layout/my/readArticle")}
            extra="657篇"
            thumb={
              <i
                style={{ color: "#abb3be" }}
                className="iconfont icon-yanjing"
              ></i>
            }
          >
            阅读过的文章
          </Item>
          <Item
            onClick={() => this.linkNewPage("/layout/my/tagManagement")}
            extra="20个"
            thumb={
              <i
                style={{ color: "#acb4be" }}
                className="iconfont icon-biaoqian"
              ></i>
            }
          >
            标签管理
          </Item>
          <Item onClick={this.logOut} className="config">
            退出登录
          </Item>
        </List>
      </div>
    );
  }
}

export default My;
