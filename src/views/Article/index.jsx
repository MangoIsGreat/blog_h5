import React, { Component } from "react";
import { Toast, Button } from "antd-mobile";
import marked from "marked";
import classnames from "classnames";
import Header from "../../components/Header";
import style from "./index.module.scss";
import { relativeTime } from "../../utils/day";

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
    this.props.history.push(`/layout/article/${id}`);
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
              <Button type="ghost" inline size="small">
                关注
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
                        <i className="iconfont icon-dianzan">
                          {item.likeNum ? item.likeNum : ""}
                        </i>
                        <i
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
                            <div className={style.replyItem} key={index2}>
                              <span className={style.name}>
                                {item2.from && item2.from.nickname}
                                {blogInfo.User &&
                                item2.from &&
                                blogInfo.User.id === item2.from.id
                                  ? "(作者)"
                                  : ""}
                              </span>
                              &nbsp;回复&nbsp;
                              <span className={style.name}>
                                {item2.to && item2.to.nickname}:&nbsp;
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
      </div>
    );
  }
}

export default Article;
