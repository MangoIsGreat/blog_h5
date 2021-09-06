import React, { Component } from "react";
import { Toast, Button } from "antd-mobile";
import marked from "marked";
import hljs from "highlight.js";
import classnames from "classnames";
import Header from "../../components/Header";
import style from "./index.module.scss";
import { relativeTime } from "../../utils/day";
import Comment from "../../components/Comment";
import "highlight.js/styles/monokai-sublime.css";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogId: props.match.params.blogId,
      blogInfo: {}, // 博客详情
      mdContent: "",
      moreArt: [], // 更多相关文章推荐
      commentList: [], // 评论列表
    };
  }

  componentDidMount() {
    // 获取文章详情
    this.getBlogInfo();

    // 获取相关文章推荐
    this.getMoreArt();

    // 获取博客评论列表
    this.getCommentList();
  }

  componentWillReceiveProps(nextProps) {
    const blogId = nextProps.match.params.blogId;

    this.setState(
      {
        blogId,
      },
      () => {
        // 获取文章详情
        this.getBlogInfo();

        // 获取相关文章推荐
        this.getMoreArt();

        // 获取评论列表
        this.getCommentList();
      }
    );
  }

  getBlogInfo = async () => {
    const data = await this.$axios.get("/blog/article", {
      params: {
        id: this.state.blogId,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("获取文章失败！", 0.5);
    }

    const mdContent = marked(data.data.content || "");

    this.setState({
      blogInfo: data.data,
      mdContent,
    });
  };

  getMoreArt = async () => {
    const data = await this.$axios.get("/blog/hot", {
      params: {
        id: this.state.blogId,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("获取相关文章推荐失败！", 0.5);
    }

    this.setState({
      moreArt: data.data.rows,
    });
  };

  getCommentList = async () => {
    const data = await this.$axios.get("/bcomment/list", {
      params: {
        blog: this.state.blogId,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("获取评论数据失败！", 0.5);
    }

    this.setState({
      commentList: data.data,
    });
  };

  linkToPage = (id) => {
    this.props.history.push(`/article/${id}`);
  };

  // 点赞评论
  likeComment = async (id) => {
    const { commentList } = this.state;

    const data = await this.$axios.post("/clike/like", {
      commentId: id,
    });

    if (data.error_code !== 0) {
      return Toast.info("点赞失败!", 0.3);
    }

    if (data.data === "ok") {
      commentList.forEach((item) => {
        if (item.id === id) {
          item.isLike = true;
          item.likeNum++;
        }
      });
    } else if (data.data === "cancel") {
      commentList.forEach((item) => {
        if (item.id === id) {
          item.isLike = false;
          item.likeNum--;
        }
      });
    }

    this.setState({
      commentList,
    });
  };

  // 点赞博客
  makeLike = async () => {
    const { blogInfo } = this.state;

    const data = await this.$axios.post("/blike/like", {
      blog: blogInfo.id,
    });

    if (data.error_code !== 0) {
      return Toast.info("点赞失败!", 0.3);
    }

    if (data.data === "ok") {
      blogInfo.isLike = true;
      blogInfo.blogLikeNum += 1;
    } else if (data.data === "cancel") {
      blogInfo.isLike = false;
      blogInfo.blogLikeNum -= 1;
    }

    this.setState({
      blogInfo,
    });
  };

  // 回复博客评论
  replyToComment = (blogId, commentId, replyCommentId) => {
    // 将commentId和replyCommentId先缓存到本地
    localStorage.setItem("commentId", commentId);
    localStorage.setItem("replyCommentId", replyCommentId);

    this.props.history.push(`/comment/publish/${blogId}/replyToComment`);
  };

  follow = async (id) => {
    const { blogInfo } = this.state;

    const data = await this.$axios.post("/fans/follow", {
      leader: id,
    });

    if (data.error_code !== 0) {
      return Toast.info("关注失败!", 0.3);
    }

    if (data.data.data === "ok") {
      blogInfo.User.isAttention = true;
    } else if (data.data.data === "cancel") {
      blogInfo.User.isAttention = false;
    }

    this.setState({
      blogInfo,
    });
  };

  // 进入用户信息页
  toUserPage = (e, id) => {
    e.stopPropagation();

    this.props.history.push(`/my/userInfo/${id}`);
  };

  render() {
    const { blogInfo, mdContent, moreArt, commentList } = this.state;

    return (
      <div className={style.article}>
        <Header title={blogInfo.title} isBack />
        <div className={style.page}>
          <div className={style.content}>
            <div className={style.user}>
              <div className={style.userInfo}>
                <img
                  onClick={(e) =>
                    this.toUserPage(e, blogInfo.User && blogInfo.User.id)
                  }
                  className={style.avatar}
                  src={blogInfo.User && blogInfo.User.avatar}
                  alt=""
                />
                <div className={style.info}>
                  <div className={style.name}>
                    {blogInfo.User && blogInfo.User.nickname}
                  </div>
                  <div className={style.time}>
                    {relativeTime(blogInfo.created_at)}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => this.follow(blogInfo.User && blogInfo.User.id)}
                style={{
                  display:
                    blogInfo.User && !blogInfo.User.isSelf ? "block" : "none",
                }}
                inline
                size="small"
              >
                <span
                  style={{
                    color: "#00c58e",
                    display:
                      blogInfo.User && !blogInfo.User.isAttention
                        ? "block"
                        : "none",
                  }}
                >
                  +&nbsp;关注
                </span>
                <span
                  style={{
                    display:
                      blogInfo.User && blogInfo.User.isAttention
                        ? "block"
                        : "none",
                  }}
                >
                  未关注
                </span>
              </Button>
            </div>
            <div className={style.title}>{blogInfo.title}</div>
            <img className={style.pic} src={blogInfo.titlePic} alt="" />
            <div dangerouslySetInnerHTML={{ __html: mdContent }}></div>
            <div>
              <span className={style.tag}>
                {blogInfo.Tag && blogInfo.Tag.tagName}
              </span>
            </div>
            <div>
              赞{blogInfo.blogLikeNum}&nbsp;·&nbsp;阅读{blogInfo.blogReadNum}
            </div>
          </div>
          <div className={style.more}>
            <div className={style.title}>相关文章</div>
            <div className={style.morecontent}>
              {moreArt.map((item, index) => {
                return (
                  <div
                    onClick={() => this.linkToPage(item.id)}
                    key={index}
                    className={style.item}
                  >
                    <div className={style.itemTitle}>{item.title}</div>
                    <div className={style.bottomLine}>
                      {item.blogLikeNum}赞&nbsp;·&nbsp;{item.commentNum}评论
                      &nbsp;·&nbsp;{item.User && item.User.nickname}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.comment}>
            {commentList.map((item, index) => {
              return (
                <div key={index} className={style.commentItem}>
                  <img
                    onClick={(e) =>
                      this.toUserPage(e, item.comment && item.comment.id)
                    }
                    className={style.avatar}
                    src={item.comment && item.comment.avatar}
                    alt=""
                  />
                  <div className={style.comContent}>
                    <div className={style.commTop}>
                      <div className={style.userinfo}>
                        <div className={style.nickname}>
                          {item.comment && item.comment.nickname}
                        </div>
                        <div className={style.profession}>
                          {item.comment && item.comment.profession} &nbsp;
                          {relativeTime(item.created_at)}
                        </div>
                      </div>
                      <div className={style.operate}>
                        <i
                          onClick={() => this.likeComment(item.id)}
                          className={classnames(
                            "iconfont",
                            { "icon-dianzan_": item.isLike },
                            { "icon-dianzan": !item.isLike }
                          )}
                          style={{ color: item.isLike ? "#00c58e" : "#96909c" }}
                        >
                          {item.likeNum ? item.likeNum : ""}
                        </i>
                        <i
                          onClick={() =>
                            this.replyToComment(
                              blogInfo.id,
                              item.id,
                              item.comment && item.comment.id
                            )
                          }
                          className={classnames(
                            style.pinlun,
                            "iconfont icon-pinglun"
                          )}
                        ></i>
                      </div>
                    </div>
                    <div className={style.word}>{item.content}</div>
                    <div
                      style={{
                        display: item.child.length > 0 ? "block" : "none",
                      }}
                      className={style.reply}
                    >
                      {item.child.length > 0 &&
                        item.child.map((item2, index2) => {
                          return (
                            <div
                              onClick={() =>
                                this.replyToComment(
                                  blogInfo.id,
                                  item.id,
                                  item2.from && item2.from.id
                                )
                              }
                              className={style.replyItem}
                              key={index2}
                            >
                              <span
                                onClick={(e) =>
                                  this.toUserPage(
                                    e,
                                    item2.from && item2.from.id
                                  )
                                }
                                className={style.name}
                              >
                                {item2.from && item2.from.nickname}
                                {blogInfo.User &&
                                item2.from &&
                                blogInfo.User.id === item2.from.id
                                  ? "(作者)"
                                  : ""}
                              </span>
                              &nbsp;回复&nbsp;
                              <span
                                onClick={(e) =>
                                  this.toUserPage(e, item2.to && item2.to.id)
                                }
                                className={style.name}
                              >
                                {item2.to && item2.to.nickname}
                                {blogInfo.User &&
                                item2.to &&
                                blogInfo.User.id === item2.to.id
                                  ? "(作者)"
                                  : ""}
                                :&nbsp;
                              </span>
                              <span>{item2.content}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 评论组件 */}
        <Comment
          infoData={blogInfo}
          type="blogComment"
          makeLike={this.makeLike}
        />
      </div>
    );
  }
}

export default Article;
