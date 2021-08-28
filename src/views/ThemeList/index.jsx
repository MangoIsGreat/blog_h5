import React, { Component } from "react";
import style from "./index.module.scss";
import Header from "../../components/Header";
import { Toast } from "antd-mobile";

class ThemeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      themeList: [],
    };
  }

  componentDidMount() {
    // 获取话题列表
    this.getThemeList();
  }

  // 获取话题列表
  getThemeList = async () => {
    const data = await this.$axios.get("/theme/list");

    if (data.error_code !== 0) {
      return Toast.info("获取话题列表失败!", 0.3);
    }

    this.setState({
      themeList: data.data,
    });
  };

  selectTheme = (value) => {
    localStorage.setItem("selectedTheme", value);

    this.props.history.goBack();
  };

  render() {
    const { themeList } = this.state;

    return (
      <div className={style.themeList}>
        <Header isBack title="话题列表" />
        <div className={style.content}>
          {themeList.map((item, index) => {
            return (
              <div
                onClick={() => this.selectTheme(item.themeName)}
                key={index}
                className={style.themeItem}
              >
                <div className={style.name}>{item.themeName}</div>
                <div className={style.dynNum}>{item.artNum}动态</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ThemeList;
