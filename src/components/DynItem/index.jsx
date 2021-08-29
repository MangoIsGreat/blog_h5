import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { relativeTime } from "../../utils/day";
import style from "./index.module.scss";
import classnames from "classnames";
import WxImageViewer from "react-wx-images-viewer";
import LazyLoad from "react-lazyload";

class DynItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      picIndex: 0,
      isOpen: false,
    };
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

  like = (e, id) => {
    e.stopPropagation();

    this.props.likeDyn(id);
  };

  share = (e, id) => {
    e.stopPropagation();

    this.props.history.push(`/qrcode/${id}`);
  };

  toUserPage = (e, id) => {
    e.stopPropagation();

    this.props.history.push(`/my/userInfo/${id}`);
  };

  render() {
    const { listData, history } = this.props;
    const { images, picIndex, isOpen } = this.state;

    return (
      <div
        onClick={() => history.push(`/interaction/${listData.id}`)}
        className={style.listRow}
      >
        <div className="list-row-top">
          <div className="list-row-header">
            <img
              onClick={(e) =>
                this.toUserPage(e, listData.userInfo && listData.userInfo.id)
              }
              className="avatar"
              src={listData.userInfo && listData.userInfo.avatar}
              alt=""
            />
            <div className="list-row-header-content">
              <div className="list-row-header-content-tit">
                {listData.userInfo && listData.userInfo.nickname}
              </div>
              <div className="list-row-header-content-desc">
                {listData.userInfo && listData.userInfo.profession}
                &nbsp;·&nbsp;{relativeTime(listData.created_at)}
              </div>
            </div>
          </div>
          <div className="list-row-content">
            <span
              style={{
                color: "#00c58e",
                display: listData.theme ? "inline" : "none",
              }}
            >
              #{listData.theme}#
            </span>
            {listData.content}
          </div>
          <div className="list-row-pic">
            {listData.picUrl &&
              listData.picUrl.length > 0 &&
              listData.picUrl.map((item, index) => {
                return (
                  <LazyLoad overflow={true}>
                    <img
                      className="list-row-pic-item"
                      onClick={(e) =>
                        this.openViewer(e, listData.picUrl, index)
                      }
                      key={index}
                      src={item}
                      alt=""
                    />
                  </LazyLoad>
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
        <div className="list-row-bottom">
          <i
            onClick={(e) => this.like(e, listData.id)}
            className={classnames(
              "iconfont",
              { "icon-dianzan_": listData.isLike },
              { "icon-dianzan": !listData.isLike }
            )}
            style={{ color: listData.isLike ? "#00c58e" : "#96909c" }}
          >
            &nbsp;{listData.likeNum || "点赞"}
          </i>
          <i className="iconfont icon-pinglun">
            &nbsp;{listData.commNum || "评论"}
          </i>
          <i
            onClick={(e) => this.share(e, listData.id)}
            className="iconfont icon-fenxiang"
          >
            &nbsp;分享
          </i>
        </div>
      </div>
    );
  }
}

DynItem.propTypes = {
  listData: PropTypes.object,
};

export default withRouter(DynItem);
