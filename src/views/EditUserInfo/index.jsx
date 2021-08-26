import React, { Component } from "react";
import Header from "../../components/Header";
import { List, Toast, TextareaItem } from "antd-mobile";
import style from "./index.module.scss";

const Item = List.Item;
const Brief = Item.Brief;

class EditUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.match.params.uid,
      userInfo: {}, // 用户信息
      nickname: "", // 用户名
      profession: "", // 职业
      signature: "", // 签名
    };
  }
  componentDidMount() {
    this.autoFocusInst.focus();

    // 获取用户信息
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const { uid } = this.state;

    const data = await this.$axios.get("/author/userinfo", {
      params: {
        uid,
      },
    });

    if (data.error_code !== 0) {
      return Toast.info("用户信息获取失败！", 1.5);
    }

    this.setState({
      userInfo: data.data,
      nickname: data.data.nickname,
      profession: data.data.profession,
      signature: data.data.signature,
    });
  };

  changeName = (value) => {
    this.setState({
      nickname: value,
    });
  };

  changeProfession = (value) => {
    this.setState({
      profession: value,
    });
  };

  changeSignature = (value) => {
    this.setState({
      signature: value,
    });
  };

  save = async () => {
    const {
      nickname,
      profession,
      signature,
      userInfo: { avatar },
    } = this.state;

    const data = await this.$axios.post("/author/updateUserInfo", {
      uid: this.state.uid,
      nickname,
      profession,
      signature,
      avatar,
    });

    if (data.error_code !== 0) {
      return Toast.info("修改失败！", 1.5);
    }

    Toast.info("修改信息成功！", .5);

    setTimeout(() => {
      this.props.history.goBack();
    }, 300);
  };

  render() {
    const { userInfo, nickname, profession, signature } = this.state;

    return (
      <div className={style.editUserPage}>
        <Header title="编辑资料" isBack />
        <List className={style.myList}>
          <Item className={style.avatar} thumb={userInfo.avatar} multipleLine>
            <div className={style.name}>{userInfo.nickname}</div>
            <Brief>{userInfo.profession}</Brief>
          </Item>

          <TextareaItem
            value={nickname}
            title="用户名"
            autoHeight
            ref={(el) => (this.autoFocusInst = el)}
            onChange={(e) => this.changeName(e)}
          />
          <TextareaItem
            value={profession}
            title="职位"
            autoHeight
            onChange={(e) => this.changeProfession(e)}
          />
          <TextareaItem
            value={signature}
            title="签名"
            autoHeight
            onChange={(e) => this.changeSignature(e)}
          />
          <Item onClick={() => this.save()} className={style.save}>
            保存
          </Item>
        </List>
      </div>
    );
  }
}

export default EditUserInfo;
