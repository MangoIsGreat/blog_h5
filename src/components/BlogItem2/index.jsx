import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { WingBlank, Flex } from "antd-mobile";
import { relativeTime } from "../../utils/day";
import LazyLoad from "react-lazyload";

function BlogItem({ listData, history, likeBlog }) {
  return (
    <WingBlank
      size="md"
      style={{
        backgroundColor: "#fff",
        padding: "0.15rem 0",
      }}
    >
      <div onClick={() => history.push(`/article/${listData.id}`)}>
        <div
          style={{
            width: "calc(100vw - 0.4rem)",
            marginBottom: "0.05rem",
            fontSize: "0.16rem",
            color: "#222528",
            fontWeight: "600",
            lineHeight: "0.22rem",
          }}
        >
          {listData.title}
        </div>
        <div style={{ display: "flex", marginBottom: "0.08rem" }}>
          <div style={{ flex: 1, paddingRight: "0.08rem" }}>
            <div
              style={{
                display: "flex",
                marginBottom: "0.05rem",
                color: "#6C7584",
                fontSize: "0.12rem",
                lineHeight: "0.16rem",
              }}
            >
              <div
                style={{
                  paddingRight: "0.08rem",
                }}
              >
                {listData.User && listData.User.nickname}
              </div>
              |
              <div style={{ padding: "0 0.08rem" }}>
                {relativeTime(listData.created_at)}
              </div>
            </div>
            <div
              style={{
                color: "#495261",
                fontSize: "0.14rem",
                lineHeight: "0.21rem",
                wordBreak: "break-all",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {listData.description}
            </div>
          </div>
          <LazyLoad overflow={true}>
            {/* <img
              style={{
                width: "0.84rem",
                height: "0.65rem",
                display: listData.titlePic ? "block" : "none",
              }}
              src={listData.titlePic}
              alt=""
            /> */}
            <div
              style={{
                display: listData.titlePic ? "block" : "none",
                width: "0.84rem",
                height: "0.65rem",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url('${listData.titlePic}')`,
              }}
            ></div>
          </LazyLoad>
        </div>
        <Flex
          style={{
            fontSize: "0.12rem",
            color: "#6C7583",
          }}
        >
          <Flex.Item>
            {listData.blogReadNum}&nbsp;??????&nbsp;??&nbsp;{listData.blogLikeNum}
            &nbsp;???&nbsp;??&nbsp;{listData.commentNum}&nbsp;??????
          </Flex.Item>
          <Flex.Item align="end">
            <span
              style={{
                padding: "0.05rem 0.06rem",
                backgroundColor: "#F4F5F5",
                borderRadius: "0.05rem",
              }}
            >
              {listData.Tag && listData.Tag.tagName}
            </span>
          </Flex.Item>
        </Flex>
      </div>
    </WingBlank>
  );
}

BlogItem.propTypes = {
  listData: PropTypes.object,
};

export default withRouter(BlogItem);
