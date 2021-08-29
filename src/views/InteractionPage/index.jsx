import { Toast } from "antd-mobile";
import React, { Component } from "react";
import Header from "../../components/Header";
import style from "./index.module.scss";
import { relativeTime } from "../../utils/day";
import classnames from "classnames";
import Comment from "../../components/Comment";
import WxImageViewer from "react-wx-images-viewer";

class InteractionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dynInfo: {}, // 动态信息
      commentsList: [], // 评论列表
      interactionId: props.match.params.id, // 动态id
      images: [], // 预览图片数组
      picIndex: 0, // 需要预览第几张图片
      isOpen: false, // 是否打开预览
    };
  }

  componentDidMount() {
    // 获取动态信息
    this.getInteractionInfo();

    // 获取动态评论
    this.getCommentList();
  }

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  openViewer = (e, images, index) => {
    e.stopPropagation();

    this.setState({
      images,
      picIndex: index,
      isOpen: true,
    });
  };

  // 获取动态详情
  getInteractionInfo = async () => {
    const { interactionId } = this.state;

    const data = await this.$axios.get("/dynamic/dynamic", {
      params: {
        id: interactionId,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("获取动态信息失败!", 0.3);
    }

    if (data.data.picUrl) {
      data.data.picUrl = JSON.parse(data.data.picUrl);
    }

    this.setState({
      dynInfo: data.data,
    });
  };

  // 获取动态评论
  getCommentList = async () => {
    const { interactionId } = this.state;

    const data = await this.$axios.get("/dcomment/list", {
      params: {
        dynamicId: interactionId,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("获取评论失败!", 0.3);
    }

    this.setState({
      commentsList: data.data,
    });
  };

  // 点赞评论
  likeComment = async (id) => {
    const { commentsList } = this.state;

    const data = await this.$axios.post("/cDlike/like", {
      commentId: id,
    });

    if (data.error_code !== 0) {
      return Toast.info("点赞失败!", 0.3);
    }

    if (data.data === "ok") {
      commentsList.forEach((item) => {
        if (item.id === id) {
          item.isLike = true;
          item.likeNum++;
        }
      });
    } else if (data.data === "cancel") {
      commentsList.forEach((item) => {
        if (item.id === id) {
          item.isLike = false;
          item.likeNum--;
        }
      });
    }

    this.setState({
      commentsList,
    });
  };

  // 进入用户信息页
  toUserPage = (e, id) => {
    e.stopPropagation();

    this.props.history.push(`/my/userInfo/${id}`);
  };

  makeLike = async () => {
    const { interactionId, dynInfo } = this.state;

    const data = await this.$axios.post("/dlike/like", {
      dynamicId: interactionId,
    });

    if (data.error_code !== 0) {
      return Toast.info("操作失败!", 0.3);
    }

    if (data.data === "ok") {
      dynInfo.isLike = true;
      dynInfo.likeNum++;
    } else if (data.data === "cancel") {
      dynInfo.isLike = false;
      dynInfo.likeNum--;
    }

    this.setState({
      dynInfo,
    });
  };

  // 回复博客评论
  replyToComment = (dynId, commentId, replyCommentId) => {
    // 将commentId和replyCommentId先缓存到本地
    localStorage.setItem("commentId", commentId);
    localStorage.setItem("replyCommentId", replyCommentId);

    this.props.history.push(
      `/comment/publish/${dynId}/replyToDynComment`
    );
  };

  render() {
    const { dynInfo, commentsList, images, picIndex, isOpen } = this.state;

    return (
      <div className={style.interactionPage}>
        <Header title="动态详情" isBack />
        <div className={style.content}>
          {/* 动态详情部分 */}
          <div className="list-row-top">
            <div className="list-row-header">
              <img
                onClick={(e) =>
                  this.toUserPage(e, dynInfo.User && dynInfo.User.id)
                }
                className="avatar"
                src={dynInfo.User && dynInfo.User.avatar}
                alt=""
              />
              <div className="list-row-header-content">
                <div className="list-row-header-content-tit">
                  {dynInfo.User && dynInfo.User.nickname}
                </div>
                <div className="list-row-header-content-desc">
                  {dynInfo.User && dynInfo.User.profession}
                  &nbsp;·&nbsp;{relativeTime(dynInfo.created_at)}
                </div>
              </div>
            </div>
            <div className="list-row-content">
              <span
                style={{
                  color: "#00c58e",
                  display: dynInfo.theme ? "inline" : "none",
                }}
              >
                #{dynInfo.theme}#
              </span>
              {dynInfo.content}
            </div>
            <div className="list-row-pic">
              {dynInfo.picUrl &&
                dynInfo.picUrl.length > 0 &&
                dynInfo.picUrl.map((item, index) => {
                  return (
                    <img
                      onClick={(e) =>
                        this.openViewer(e, dynInfo.picUrl, index)
                      }
                      className="list-row-pic-item"
                      key={index}
                      src={item}
                      alt=""
                    />
                  );
                })}
              {isOpen ? (
                <WxImageViewer
                  onClose={this.onClose}
                  urls={images}
                  index={picIndex}
                />
              ) : null}
            </div>
          </div>
          {/* 评论部分 */}
          <div className={style.comment}>
            {commentsList.map((item, index) => {
              return (
                <div key={index} className={style.commentItem}>
                  <img
                    onClick={(e) =>
                      this.toUserPage(e, item.userInfo && item.userInfo.id)
                    }
                    className={style.avatar}
                    src={item.userInfo && item.userInfo.avatar}
                    alt=""
                  />
                  <div className={style.comContent}>
                    <div className={style.commTop}>
                      <div className={style.userinfo}>
                        <div className={style.nickname}>
                          {item.userInfo && item.userInfo.nickname}
                        </div>
                        <div className={style.profession}>
                          {item.userInfo && item.userInfo.profession} &nbsp;
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
                              dynInfo.id,
                              item.id,
                              item.userInfo && item.userInfo.id
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
                                  dynInfo.id,
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
                                {dynInfo.User &&
                                item2.from &&
                                dynInfo.User.id === item2.from.id
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
                                {dynInfo.User &&
                                item2.to &&
                                dynInfo.User.id === item2.to.id
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
        {/* 评论框 */}
        <Comment
          makeLike={this.makeLike}
          infoData={dynInfo}
          type="dynComment"
        />
      </div>
    );
  }
}

export default InteractionPage;
