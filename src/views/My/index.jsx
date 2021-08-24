import React, { Component } from "react";
import Header from "../../components/Header";
import { List, Modal } from "antd-mobile";
import style from "./index.module.scss";
import avatar from "../../assets/img/avatar.png";

const Item = List.Item;
const Brief = Item.Brief;

const alert = Modal.alert;

class My extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "", // token
      userInfo: {}, // 用户信息
    };
  }

  componentDidMount() {
    // 获取登录信息
    this.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({
      token: localStorage.getItem("user_token"),
      userInfo: JSON.parse(localStorage.getItem("user_info")),
    });
  };

  linkNewPage = (path) => {
    this.props.history.push(path);
  };

  logOut = () => {
    alert("您确定要退出吗？", "", [
      {
        text: "取消",
        style: "default",
      },
      {
        text: "确定",
        onPress: () => {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user_info");

          this.getUserInfo();
        },
      },
    ]);
  };

  render() {
    const { token, userInfo } = this.state;

    return (
      <div className={style.my}>
        <Header title="我的" />
        <List className={style.myList}>
          {token ? (
            <Item
              className={style.author}
              arrow="horizontal"
              thumb={userInfo.avatar}
              multipleLine
              onClick={() => this.linkNewPage("/layout/my/userInfo")}
            >
              <div className="name">{userInfo.nickname}</div>{" "}
              <Brief>{userInfo.profession}</Brief>
            </Item>
          ) : (
            <Item
              className={style.author}
              arrow="horizontal"
              thumb={avatar}
              multipleLine
              onClick={() => this.linkNewPage("/layout/login")}
            >
              <div className="name">登录&nbsp;/&nbsp;注册</div>
            </Item>
          )}

          <Item
            onClick={() =>
              this.linkNewPage(
                token ? "/layout/my/messageCenter" : "/layout/login"
              )
            }
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
            onClick={() =>
              this.linkNewPage(token ? "/layout/my/likedList" : "/layout/login")
            }
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
            onClick={() =>
              this.linkNewPage(
                token ? "/layout/my/collection" : "/layout/login"
              )
            }
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
            onClick={() =>
              this.linkNewPage(
                token ? "/layout/my/readArticle" : "/layout/login"
              )
            }
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
            onClick={() =>
              this.linkNewPage(
                token ? "/layout/my/tagManagement" : "/layout/login"
              )
            }
            thumb={
              <i
                style={{ color: "#acb4be" }}
                className="iconfont icon-biaoqian"
              ></i>
            }
          >
            标签管理
          </Item>
          {token ? (
            <Item onClick={this.logOut} className="config">
              退出登录
            </Item>
          ) : null}
        </List>
      </div>
    );
  }
}

export default My;
