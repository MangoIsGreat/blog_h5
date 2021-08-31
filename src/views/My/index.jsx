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

  linkUserPage = (path) => {
    this.props.history.push({
      pathname: `${path}/${this.state.userInfo.id}`,
    });
  };

  linkNewPage = (path) => {
    this.props.history.push({
      pathname: path,
    });
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
              onClick={() => this.linkUserPage("/my/userInfo")}
            >
              <div className="name">{userInfo.nickname}</div>
              <Brief>{userInfo.profession}</Brief>
            </Item>
          ) : (
            <Item
              className={style.author}
              arrow="horizontal"
              thumb={avatar}
              multipleLine
              onClick={() => this.linkNewPage("/login")}
            >
              <div className="name">登录&nbsp;/&nbsp;注册</div>
            </Item>
          )}
          <Item
            onClick={() =>
              this.linkNewPage(
                token ? `/my/likedList/${userInfo.id}` : "/login"
              )
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
                token ? `/my/collection/${userInfo.id}` : "/login"
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
              this.linkNewPage(token ? "/my/readArticle" : "/login")
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
              this.linkNewPage(token ? "/my/tagManagement" : "/login")
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
