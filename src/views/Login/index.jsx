import React, { Component } from "react";
import Header from "../../components/Header";
import { WhiteSpace, WingBlank, Flex, Toast } from "antd-mobile";
import { Field, Form, withFormik, ErrorMessage } from "formik";
import { axios } from "../../utils/axios";
import * as Yup from "yup";

import styles from "./index.module.scss";

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Header title="登录" isBack />
        <WhiteSpace size="lg" />
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field
                name="username"
                className={styles.input}
                placeholder="请输入账号"
                type="text"
              />
            </div>
            <ErrorMessage
              component="div"
              className={styles.error}
              name="username"
            />
            <div className={styles.formItem}>
              <Field
                name="password"
                className={styles.input}
                placeholder="请输入密码"
                type="password"
              />
            </div>
            <ErrorMessage
              component="div"
              className={styles.error}
              name="password"
            />
            <div className={styles.formSubmit}>
              <input className={styles.submit} value="登录" type="submit" />
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <a href="#/layout/register">没有账号？点击注册</a>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

const USERNAMEREG = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const PASSWORDREG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;

export default withFormik({
  mapPropsToValues: () => ({ username: "", password: "" }),
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .matches(USERNAMEREG, "不是正确的Email格式！")
      .required("账号为必填项"),
    password: Yup.string()
      .matches(PASSWORDREG, "密码长度为6到32,且包含字符、数字或_！")
      .required("账号为必填项"),
  }),
  handleSubmit: async (values, { props }) => {
    const result = await axios.post("/user/login", {
      account: values.username,
      secret: values.password,
      type: 101,
    });

    if (result.error_code === 0) {
      // 保存token
      localStorage.setItem("user_token", result.token);
      localStorage.setItem("user_info", JSON.stringify(result.data));

      // 跳转，返回
      if (props.location.state) {
        props.history.replace(props.location.state.to);
      } else {
        props.history.goBack();
      }
    } else {
      Toast.info("登录失败", 1.5);
    }
  },
})(Login);
