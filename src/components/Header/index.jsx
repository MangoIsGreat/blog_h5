import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 0.13rem",
  boxSizing: "border-box",
  height: "0.45rem",
  textAlign: "center",
  lineHeight: "0.45rem",
  fontSize: "0.16rem",
  color: "#24272B",
  backgroundColor: "#F9F9F9",
  fontWeight: 700,
};

function Header({ title, isBack, isShare, history, noBorder }) {
  return (
    <div
      style={{
        ...style,
        borderBottom: noBorder ? "none" : "0.01rem solid #D2D2D7",
      }}
    >
      <div>
        <div
          style={{ display: isBack ? "block" : "none" }}
          className="iconfont icon-xiangzuo"
          onClick={() => history.goBack()}
        ></div>
      </div>
      <div>{title}</div>
      <div>
        <div
          style={{ display: isShare ? "block" : "none" }}
          className="iconfont icon-shenglvehao"
        ></div>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
  isShare: PropTypes.bool,
  noBorder: PropTypes.bool,
};

export default withRouter(Header);
