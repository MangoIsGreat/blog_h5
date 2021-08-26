import React, { Component } from "react";
import style from "./index.module.scss";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

class Comment extends Component {
  publish = (id) => {
    const { type } = this.props;

    this.props.history.push(`/layout/comment/publish/${id}/${type}`);
  };

  // 点赞博客
  likeBlog = (e) => {
    e.stopPropagation();

    this.props.makeLike();
  };

  render() {
    const { infoData } = this.props;

    return (
      <div
        className={style.commentBox}
        onClick={() => this.publish(infoData.id)}
      >
        <input
          className={style.input}
          disabled
          type="text"
          placeholder="输入评论..."
        />
        <i
          onClick={(e) => this.likeBlog(e)}
          className={classNames(
            style.dianzan,
            "iconfont",
            { "icon-dianzan_": infoData.isLike },
            { "icon-dianzan": !infoData.isLike }
          )}
          style={{ color: infoData.isLike ? "#00c58e" : "#96909c" }}
        >
          {infoData.blogLikeNum || infoData.likeNum}
        </i>
        <i className={classNames(style.pinglun, "iconfont icon-pinglun")}>
          {infoData.commentNum || infoData.commNum}
        </i>
      </div>
    );
  }
}

export default withRouter(Comment);
