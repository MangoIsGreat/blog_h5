import React from "react";
import PropTypes from "prop-types";
import { relativeTime } from "../../utils/day";
import "./index.module.scss";

function DynItem({ listData }) {
  return (
    <div className="list-row">
      <div className="list-row-top">
        <div className="list-row-header">
          <img
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
                <img
                  className="list-row-pic-item"
                  key={index}
                  src={item}
                  alt=""
                />
              );
            })}
        </div>
      </div>
      <div className="list-row-bottom">
        <i className="iconfont icon-dianzan">&nbsp;点赞</i>
        <i className="iconfont icon-pinglun">&nbsp;评论</i>
        <i className="iconfont icon-fenxiang">&nbsp;分享</i>
      </div>
    </div>
  );
}

DynItem.propTypes = {
  listData: PropTypes.object,
};

export default DynItem;
