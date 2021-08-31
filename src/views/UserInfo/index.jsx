import React, { Component } from "react";
import style from "./index.module.scss";
import { Flex, Button, Toast, List } from "antd-mobile";
import ClassName from "classnames";
import TabsCom from "../../components/TabsCom";
import ListBox from "./List";

const Item = List.Item;

class AuthorInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      checkedTab: 0,
      uid: props.match.params.uid, // 用户id
      isAttention: false,
    };
  }

  tabs = [
    { title: "动态" },
    { title: "文章" },
    { title: "互动" },
    { title: "其他" },
  ];

  componentDidMount() {
    this.getUserInfo();
  }

  // 获取用户信息
  getUserInfo = async () => {
    const { uid } = this.state;

    const data = await this.$axios.get("/author/userinfo", {
      params: {
        uid,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("用户信息请求错误", 1.5);
    }

    this.setState({
      userInfo: data.data,
      isAttention: data.data.isAttention,
    });
  };

  goback = () => {
    this.props.history.go(-1);
  };

  onChange = (tab, index) => {
    this.setState({
      checkedTab: index,
    });
  };

  linkNewPage = (path) => {
    this.props.history.push({
      pathname: `${path}`,
    });
  };

  follow = async (id) => {
    const data = await this.$axios.post("/fans/follow", {
      leader: id,
    });

    if (data.error_code !== 0) {
      return Toast.info("关注失败!", 0.3);
    }

    if (data.data === "ok") {
      this.setState({
        isAttention: true,
      });
    } else if (data.data === "cancel") {
      this.setState({
        isAttention: false,
      });
    }
  };

  renderTabsContent = () => {
    const { checkedTab, uid } = this.state;

    return checkedTab !== 3 ? (
      <ListBox type={checkedTab} uid={uid} />
    ) : (
      <List className={style.myList}>
        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => this.linkNewPage(`/my/likedList/${uid}`)}
        >
          赞过的
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => this.linkNewPage(`/my/collection/${uid}`)}
        >
          收藏集
        </Item>
      </List>
    );
  };

  goNewPage = (id) => {
    this.props.history.push(`/editinfo/${id}`);
  };

  share = (id) => {
    this.props.history.push(`/qrcode/${id}`);
  };

  render() {
    const { userInfo, isAttention } = this.state;

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
            <Flex.Item align="end" onClick={() => this.share(userInfo.id)}>
              <i
                className={ClassName(style.icon, "iconfont", "icon-fenxiang")}
              ></i>
            </Flex.Item>
          </Flex>
        </div>
        <div
          style={{
            backgroundImage: `url('${userInfo.avatar}')`,
          }}
          className={style.avatar}
        ></div>
        <div className={style.detailInfo}>
          <Flex className={style.nameLine}>
            <Flex.Item className={style.start}>
              <div className={style.name}>{userInfo.nickname}</div>
              <div className={style.job}>{userInfo.profession}</div>
            </Flex.Item>
            <Flex.Item className={style.end} align="end">
              <Button
                className={style.btn}
                style={{ display: userInfo.isSelf ? "block" : "none" }}
                inline
                size="small"
                onClick={() => this.goNewPage(userInfo.id)}
              >
                编辑
              </Button>
              <Button
                className={style.btn}
                style={{ display: !userInfo.isSelf ? "block" : "none" }}
                onClick={() => this.follow(userInfo.id)}
                inline
                size="small"
              >
                <span
                  style={{
                    color: "#00c58e",
                    display: !isAttention ? "block" : "none",
                  }}
                >
                  +&nbsp;关注
                </span>
                <span
                  style={{
                    color: "#aeb4bb",
                    display: isAttention ? "block" : "none",
                  }}
                >
                  已关注
                </span>
              </Button>
            </Flex.Item>
          </Flex>
          <div className={style.desc}>{userInfo.signature}</div>
          <div className={style.fansBox}>
            <div className={ClassName(style.item, style.like)}>
              <div className={style.num}>{userInfo.idolNum}</div>
              <div className={style.word}>关注</div>
            </div>
            <div className={ClassName(style.item, style.fans)}>
              <div className={style.num}>{userInfo.fansNum}</div>
              <div className={style.word}>关注者</div>
            </div>
            <div className={ClassName(style.item, style.value)}>
              <div className={style.num}>{userInfo.blogLikeNum}</div>
              <div className={style.word}>获赞</div>
            </div>
            <div className={ClassName(style.item, style.value)}>
              <div className={style.num}>{userInfo.blogReadNum}</div>
              <div className={style.word}>被阅读</div>
            </div>
          </div>
        </div>
        {/* Tabs栏 */}
        <TabsCom
          tabs={this.tabs}
          tabSize={4}
          swipeable={true}
          renderTabsContent={this.renderTabsContent}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default AuthorInfo;
