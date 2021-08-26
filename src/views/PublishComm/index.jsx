import React, { Component } from "react";
import { TextareaItem, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";

class PublishComm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      id: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.autoFocusInst.focus();

    this.setState({
      id,
    });
  }

  input = (value) => {
    this.setState({
      value,
    });
  };

  // 评论博客
  publish = () => {
    const { type } = this.props.match.params;

    switch (type) {
      // 评论博客
      case "blogComment":
        this.makeBlogComment();
        break;
      // 博客评论回复
      case "replyToComment":
        this.makeReplyToComment();
        break;
      // 动态评论回复
      case "replyToDynComment":
        this.makeReplyToDynComment();
        break;
      // 评论动态
      case "dynComment":
        this.makeDynComment();
        break;
      default:
        break;
    }
  };

  // 评论博客
  makeBlogComment = async () => {
    const { id, value } = this.state;

    const data = await this.$axios.post("/bcomment/comment", {
      blog: id,
      content: value,
    });

    if (data.error_code !== 0) {
      return Toast.info("评论失败!", 0.5);
    }

    Toast.info("评论成功!", 0.3);

    setTimeout(() => {
      this.props.history.goBack();
    }, 500);
  };

  // 评论动态
  makeDynComment = async () => {
    const { id, value } = this.state;

    const data = await this.$axios.post("/dcomment/comment", {
      dynamic: id,
      content: value,
    });

    if (data.error_code !== 0) {
      return Toast.info("评论失败!", 0.3);
    }

    Toast.info("评论成功!", 0.5);

    setTimeout(() => {
      this.props.history.goBack();
    }, 500);
  };

  // 评论博客评论
  makeReplyToComment = async () => {
    const { id, value } = this.state;
    const commentId = localStorage.getItem("commentId");
    const replyCommentId = localStorage.getItem("replyCommentId");

    const data = await this.$axios.post("/bcomment/reply", {
      blog: id, // 博客id
      content: value, // 评论内容
      comment: commentId, // 评论id
      toUid: replyCommentId, // 要回复的"评论"&"评论回复"的用户的id
    });

    if (data.error_code !== 0) {
      return Toast.info("评论失败!", 0.3);
    }

    Toast.info("评论成功!", 0.3);

    setTimeout(() => {
      this.props.history.goBack();
    }, 500);
  };

  // 评论动态评论
  makeReplyToDynComment = () => {
    // const data = await request({
    //   url: "/dcomment/reply",
    //   method: "POST",
    //   data: {
    //     dynamicId: this.id, // 博客id
    //     content: this.value, // 评论内容
    //     commentId: this.commentId, // 评论id
    //     toUid: this.targetId, // 要回复的"评论"&"评论回复"的id
    //   },
    // });
    // if (data.data.error_code !== 0) {
    //   return this.$refs["toast"].open({
    //     message: "评论失败！",
    //   });
    // }
    // // 评论成功返回上一页
    // uni.navigateBack();
  };

  render() {
    return (
      <div style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Header isBack isPublish title="评论" publish={this.publish} />
        <TextareaItem
          placeholder="输入评论..."
          ref={(el) => (this.autoFocusInst = el)}
          rows={6}
          onChange={(value) => this.input(value)}
        />
      </div>
    );
  }
}

export default withRouter(PublishComm);
