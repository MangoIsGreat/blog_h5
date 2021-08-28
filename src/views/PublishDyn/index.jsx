import React, { Component } from "react";
import { TextareaItem, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";

class PublishDyn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      theme: "", // 选中的话题
    };
  }

  componentDidMount() {
    this.autoFocusInst.focus();

    // 设置Theme
    this.setState({
      theme: localStorage.getItem("selectedTheme"),
    });
  }

  input = (value) => {
    this.setState({
      value,
    });
  };

  // 评论博客
  publish = async () => {
    const { theme, value } = this.state;

    if (!theme) {
      return Toast.info("请先添加话题!", 0.3);
    }

    const data = await this.$axios.post("/dynamic/create", {
      theme,
      content: value,
      picUrl: "",
    });

    if (data.error_code !== 0) {
      return Toast.info("发布失败!", 0.3);
    }

    this.props.history.goBack();
  };

  componentWillUnmount() {
    localStorage.removeItem("selectedTheme");
  }

  render() {
    const { history } = this.props;
    const { theme } = this.state;

    const style = {
      padding: "0.04rem 0.1rem",
      boxSize: "border-box",
      borderRadius: "0.18rem",
      color: "#00c58e",
      border: "0.01rem solid #00c58e",
      display: "inline-block",
      marginLeft: "0.1rem",
    };

    return (
      <div style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Header onClick isBack isPublish title="评论" publish={this.publish} />
        <TextareaItem
          placeholder="告诉你一个秘密,发布动态不能少于5个字哦,另外添加合适的话题会被更多的人看见..."
          ref={(el) => (this.autoFocusInst = el)}
          rows={4}
          onChange={(value) => this.input(value)}
        />
        <div onClick={() => history.push("/layout/theme")} style={style}>
          {theme ? <span>{theme}</span> : <span>添加话题&nbsp;&gt;</span>}
        </div>
      </div>
    );
  }
}

export default withRouter(PublishDyn);
