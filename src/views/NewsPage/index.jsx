import React, { Component } from "react";
import { Toast, Button } from "antd-mobile";
import marked from "marked";
import Header from "../../components/Header";
import style from "./index.module.scss";
import { relativeTime } from "../../utils/day";

class NewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsid: props.match.params.newsid,
      newsInfo: {}, // 博客详情
      mdContent: "",
      moreArt: [], // 更多相关文章推荐
    };
  }

  componentDidMount() {
    // 获取文章详情
    this.getBlogInfo();

    // 获取相关文章推荐
    this.getMoreArt();
  }

  componentWillReceiveProps(nextProps) {
    const newsid = nextProps.match.params.newsid;

    this.setState(
      {
        newsid,
      },
      () => {
        // 获取文章详情
        this.getBlogInfo();

        // 获取相关文章推荐
        this.getMoreArt();
      }
    );
  }

  getBlogInfo = async () => {
    const data = await this.$axios.get("/news/article", {
      params: {
        id: this.state.newsid,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("获取文章失败！", 0.3);
    }

    const mdContent = marked(data.data.content || "");

    this.setState({
      newsInfo: data.data,
      mdContent,
    });
  };

  getMoreArt = async () => {
    const data = await this.$axios.get("/news/more", {
      params: {
        id: this.state.newsid,
        pageIndex: 1,
        pageSize: 6,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("获取相关文章推荐失败！", 0.5);
    }

    this.setState({
      moreArt: data.data.rows,
    });
  };

  linkToPage = (id) => {
    this.props.history.push(`/news/${id}`);
  };

  follow = async (id) => {
    const { newsInfo } = this.state;

    const data = await this.$axios.post("/fans/follow", {
      leader: id,
    });

    if (data.error_code !== 0) {
      return Toast.info("关注失败!", 0.3);
    }

    if (data.data.data === "ok") {
      newsInfo.User.isAttention = true;
    } else if (data.data.data === "cancel") {
      newsInfo.User.isAttention = false;
    }

    this.setState({
      newsInfo,
    });
  };

  // 进入用户信息页
  toUserPage = (e, id) => {
    e.stopPropagation();

    this.props.history.push(`/my/userInfo/${id}`);
  };

  render() {
    const { newsInfo, mdContent, moreArt } = this.state;

    console.log(888, moreArt);

    return (
      <div className={style.article}>
        <Header title={newsInfo.title} isBack />
        <div className={style.page}>
          <div className={style.content}>
            <div className={style.user}>
              <div className={style.userInfo}>
                <img
                  onClick={(e) =>
                    this.toUserPage(e, newsInfo.User && newsInfo.User.id)
                  }
                  className={style.avatar}
                  src={newsInfo.User && newsInfo.User.avatar}
                  alt=""
                />
                <div className={style.info}>
                  <div className={style.name}>
                    {newsInfo.User && newsInfo.User.nickname}
                  </div>
                  <div className={style.time}>
                    {relativeTime(newsInfo.created_at)}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => this.follow(newsInfo.User && newsInfo.User.id)}
                style={{
                  display:
                    newsInfo.User && !newsInfo.User.isSelf ? "block" : "none",
                }}
                inline
                size="small"
              >
                <span
                  style={{
                    color: "#00c58e",
                    display:
                      newsInfo.User && !newsInfo.User.isAttention
                        ? "block"
                        : "none",
                  }}
                >
                  +&nbsp;关注
                </span>
                <span
                  style={{
                    display:
                      newsInfo.User && newsInfo.User.isAttention
                        ? "block"
                        : "none",
                  }}
                >
                  未关注
                </span>
              </Button>
            </div>
            <div className={style.title}>{newsInfo.title}</div>
            <img className={style.pic} src={newsInfo.titlePic} alt="" />
            <div dangerouslySetInnerHTML={{ __html: mdContent }}></div>
            <div>
              <span className={style.tag}>
                {newsInfo.NewsType && newsInfo.NewsType.tagName}
              </span>
            </div>
            <div>
              赞{newsInfo.newsLikeNum}&nbsp;·&nbsp;阅读{newsInfo.newsReadNum}
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
        </div>
      </div>
    );
  }
}

export default NewsPage;
