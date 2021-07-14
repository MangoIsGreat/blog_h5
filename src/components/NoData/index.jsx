import React from "react";

const style = {
  height: "calc(100vh - 0.42rem)",
  color: "#979EA7",
  textAlign: "center",
  fontSize: "0.16rem",
  lineHeight: "0.5rem",
};

function NoData() {
  return <div style={style}>数据跑丢了~</div>;
}

export default NoData;
