import React, { Component } from "react";
import style from "./dynamic.module.scss";
import PropTypes from "prop-types";
import { Flex, Button, Toast, List } from "antd-mobile";
import ClassName from "classnames";
import { relativeTime } from "../../utils/day";

class DynamicItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { listData } = this.props;

    return (
      <div className={style.dynamicItem}>
        <div
          className={style.headItem}
          style={{ display: listData.type === 100 ? "block" : "none" }}
        >
          {listData.User && listData.User.nickname}&nbsp;发布了文章
        </div>
        <div
          className={style.headItem}
          style={{ display: listData.type === 200 ? "block" : "none" }}
        >
          {listData.userInfo && listData.userInfo.nickname}&nbsp;发布了动态
        </div>
        <div
          className={style.headItem}
          style={{ display: listData.type === 300 ? "block" : "none" }}
        >
          {listData.User && listData.User.nickname}&nbsp;发布了资讯
        </div>
        <div
          className={style.headItem}
          style={{ display: listData.type === 400 ? "block" : "none" }}
        >
          {listData.User && listData.User.nickname}&nbsp;赞了这篇文章
        </div>
        <div
          className={style.headItem}
          style={{ display: listData.type === 500 ? "block" : "none" }}
        >
          {listData.User && listData.User.nickname}&nbsp;赞了动态
        </div>
        <div
          className={style.headItem}
          style={{ display: listData.type === 600 ? "block" : "none" }}
        >
          {listData.User && listData.User.nickname}&nbsp;赞了资讯
        </div>
        <div
          className={style.listItem}
          style={{ display: listData.type === 400 ? "block" : "none" }}
        >
          <div className={style.listItemTit}>
            {listData.Blog && listData.Blog.title}
          </div>
          <div className={style.content}>
            <div className={style.innerBox}>
              <div className={style.userinfo}>
                <span>{listData.User && listData.User.nickname}</span>
                &nbsp;&nbsp;
                <span>{relativeTime(listData.created_at)}</span>
              </div>
              <div className={style.desc}>
                {listData.Blog && listData.Blog.description}
              </div>
            </div>
            <img
              style={{
                display:
                  listData.Blog && listData.Blog.titlePic ? "block" : "none",
              }}
              className={style.rightPic}
              src={listData.Blog && listData.Blog.titlePic}
              alt=""
            />
          </div>
          <div>
            {listData.Blog && listData.Blog.blogReadNum}&nbsp;阅读&nbsp;·&nbsp;
            {listData.Blog && listData.Blog.blogLikeNum}&nbsp;赞&nbsp;·&nbsp;
            {listData.Blog && listData.Blog.commentNum}评论
          </div>
        </div>
        <div
          className={style.listItem}
          style={{ display: listData.type === 100 ? "block" : "none" }}
        >
          <div className={style.listItemTit}>{listData.title}</div>
          <div className={style.content}>
            <div className={style.innerBox}>
              <div className={style.userinfo}>
                <span>{listData.User && listData.User.nickname}</span>
                &nbsp;&nbsp;
                <span>{relativeTime(listData.created_at)}</span>
              </div>
              <div className={style.desc}>{listData.description}</div>
            </div>
            <img
              style={{
                display: listData.titlePic ? "block" : "none",
              }}
              className={style.rightPic}
              src={listData.titlePic}
              alt=""
            />
          </div>
          <div>
            {listData.blogReadNum}&nbsp;阅读&nbsp;·&nbsp;
            {listData.blogLikeNum}&nbsp;赞&nbsp;·&nbsp;
            {listData.commentNum}评论
          </div>
        </div>
        <div
          className={style.listItem}
          style={{ display: listData.type === 300 ? "block" : "none" }}
        >
          <div className={style.listItemTit}>{listData.title}</div>
          <div className={style.content}>
            <div className={style.innerBox}>
              <div className={style.userinfo}>
                <span>{listData.User && listData.User.nickname}</span>
                &nbsp;&nbsp;
                <span>{relativeTime(listData.created_at)}</span>
              </div>
              <div className={style.desc}>{listData.description}</div>
            </div>
            <img
              style={{
                display: listData.titlePic ? "block" : "none",
              }}
              className={style.rightPic}
              src={listData.titlePic}
              alt=""
            />
          </div>
          <div>
            {listData.newsReadNum}&nbsp;阅读&nbsp;·&nbsp;
            {listData.newsLikeNum}&nbsp;赞&nbsp;
          </div>
        </div>
        <div
          className={style.listItem}
          style={{ display: listData.type === 600 ? "block" : "none" }}
        >
          <div className={style.listItemTit}>
            {listData.News && listData.News.title}
          </div>
          <div className={style.content}>
            <div className={style.innerBox}>
              <div className={style.userinfo}>
                <span>{listData.User && listData.User.nickname}</span>
                &nbsp;&nbsp;
                <span>{relativeTime(listData.created_at)}</span>
              </div>
              <div className={style.desc}>
                {listData.News && listData.News.description}
              </div>
            </div>
            <img
              style={{
                display:
                  listData.News && listData.News.titlePic ? "block" : "none",
              }}
              className={style.rightPic}
              src={listData.News && listData.News.titlePic}
              alt=""
            />
          </div>
          <div>
            {listData.News && listData.News.newsReadNum}&nbsp;阅读&nbsp;·&nbsp;
            {listData.News && listData.News.newsLikeNum}&nbsp;赞&nbsp;
          </div>
        </div>
        <div
          className={style.dynItem}
          style={{ display: listData.type === 500 ? "block" : "none" }}
        >
          <div className={style.dynItemTop}>
            <img
              className={style.avatar}
              src={listData.User && listData.User.avatar}
              alt=""
            />
            <div>
              <div className={style.name}>
                {listData.User && listData.User.nickname}
              </div>
              <div>
                {listData.User && listData.User.profession}&nbsp;&nbsp;
                {relativeTime(listData.created_at)}
              </div>
            </div>
          </div>
          <div className={style.dynItemContent}>
            <span
              className={style.theme}
              style={{
                display:
                  listData.Dynamic && listData.Dynamic.theme
                    ? "inline"
                    : "none",
              }}
            >
              #{listData.Dynamic && listData.Dynamic.theme}#
            </span>
            {listData.Dynamic && listData.Dynamic.content}
          </div>
        </div>
        <div
          className={style.dynItem}
          style={{ display: listData.type === 200 ? "block" : "none" }}
        >
          <div className={style.dynItemTop}>
            <img
              className={style.avatar}
              src={listData.userInfo && listData.userInfo.avatar}
              alt=""
            />
            <div>
              <div className={style.name}>
                {listData.userInfo && listData.userInfo.nickname}
              </div>
              <div>
                {listData.userInfo && listData.userInfo.profession}&nbsp;&nbsp;
                {relativeTime(listData.created_at)}
              </div>
            </div>
          </div>
          <div className={style.dynItemContent}>
            <span
              className={style.theme}
              style={{
                display: listData.theme ? "inline" : "none",
              }}
            >
              #{listData.theme}#
            </span>
            {listData.content}
          </div>
        </div>
      </div>
    );
  }
}

DynamicItem.propTypes = {
  listData: PropTypes.object,
};

export default DynamicItem;
