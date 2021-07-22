import React, { Component } from "react";
import style from "./index.module.scss";
import { Flex, Button } from "antd-mobile";
import ClassName from "classnames";
import TabsCom from "../../components/TabsCom";
import List from "./List";

class AuthorInfo extends Component {
  tabs = [
    { title: "动态" },
    { title: "文章" },
    { title: "互动" },
    { title: "其他" },
  ];

  goback = () => {
    this.props.history.go(-1);
  };

  renderTabsContent = () => {
    return <List />;
  };

  render() {
    return (
      <div className={style.userInfo}>
        <div className={style.bgImg}></div>
        <div className={style.goBack}>
          <Flex style={{ height: "100%" }}>
            <Flex.Item onClick={() => this.goback()}>
              <i
                className={ClassName(style.icon, "iconfont", "icon-xiangzuo")}
              ></i>
            </Flex.Item>
            <Flex.Item align="end">
              <i
                className={ClassName(style.icon, "iconfont", "icon-fenxiang")}
              ></i>
            </Flex.Item>
          </Flex>
        </div>
        <div
          style={{
            backgroundImage: `url('https://user-gold-cdn.xitu.io/2020/1/18/16fb901f1bac3975?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1')`,
          }}
          className={style.avatar}
        ></div>
        <div className={style.detailInfo}>
          <Flex className={style.nameLine}>
            <Flex.Item>
              <div className={style.name}>橘猫很方</div>
              <div className={style.job}>前端开发工程师</div>
            </Flex.Item>
            <Flex.Item align="end">
              <Button type="ghost" inline size="small">
                编辑
              </Button>
            </Flex.Item>
          </Flex>
          <div className={style.desc}>你会变强的！</div>
          <div className={style.fansBox}>
            <div className={ClassName(style.item, style.like)}>
              <div className={style.num}>25</div>
              <div className={style.word}>关注</div>
            </div>
            <div className={ClassName(style.item, style.fans)}>
              <div className={style.num}>25</div>
              <div className={style.word}>关注者</div>
            </div>
            <div className={ClassName(style.item, style.value)}>
              <div className={style.num}>1</div>
              <div className={style.word}>活跃值</div>
            </div>
          </div>
        </div>
        {/* Tabs栏 */}
        <TabsCom
          tabs={this.tabs}
          tabSize={4}
          swipeable={true}
          renderTabsContent={this.renderTabsContent}
        />
      </div>
    );
  }
}

export default AuthorInfo;
