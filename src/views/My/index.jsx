import React, { Component } from "react";
import Header from "../../components/Header";
import { List } from "antd-mobile";
import style from "./index.module.scss";

const Item = List.Item;
const Brief = Item.Brief;

class My extends Component {
  linkNewPage = (path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className={style.my}>
        <Header />
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
          {}
          <Item
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
            extra="20个"
            thumb={
              <i
                style={{ color: "#f6c55f" }}
                className="iconfont icon-yanjing"
              ></i>
            }
          >
            收藏集
          </Item>
          <Item
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
          <Item
            className="config"
            thumb={
              <i
                style={{ color: "#acb4be" }}
                className="iconfont icon-shezhi"
              ></i>
            }
          >
            设置
          </Item>
        </List>
      </div>
    );
  }
}

export default My;
