import React from "react";
import { Tabs } from "antd-mobile";

const tabs = [
  { title: "综合", sub: "1" },
  { title: "文章", sub: "2" },
  { title: "资讯", sub: "3" },
  { title: "用户", sub: "4" },
];

function Tab({ onTabClick }) {
  const tabClick = (tab, index) => {
    onTabClick(tab, index);
  };

  return (
    <Tabs
      tabs={tabs}
      initialPage={1}
      onTabClick={(tab, index) => tabClick(tab, index)}
    ></Tabs>
  );
}

export default Tab;
