import React, { Component } from "react";
import Header from "../../components/Header";
import { WhiteSpace, WingBlank, Toast } from "antd-mobile";
import { Field, Form, withFormik, ErrorMessage } from "formik";
import { axios } from "../../utils/axios";
import * as Yup from "yup";

import styles from "./index.module.scss";

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Header title="注册" isBack />
        <WhiteSpace size="lg" />
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field
                name="nickname"
                className={styles.input}
                placeholder="请输入昵称"
                type="text"
              />
            </div>
            <ErrorMessage
              component="div"
              className={styles.error}
              name="nickname"
            />
            <div className={styles.formItem}>
              <Field
                name="account"
                className={styles.input}
                placeholder="请输入邮箱"
                type="text"
              />
            </div>
            <ErrorMessage
              component="div"
              className={styles.error}
              name="account"
            />
            <div className={styles.formItem}>
              <Field
                name="password1"
                className={styles.input}
                placeholder="请输入密码"
                type="password"
              />
            </div>
            <ErrorMessage
              component="div"
              className={styles.error}
              name="password1"
            />
            <div className={styles.formItem}>
              <Field
                name="password2"
                className={styles.input}
                placeholder="确认密码"
                type="password"
              />
            </div>
            <ErrorMessage
              component="div"
              className={styles.error}
              name="password2"
            />
            <div className={styles.formSubmit}>
              <input className={styles.submit} value="注册" type="submit" />
            </div>
          </Form>
        </WingBlank>
      </div>
    );
  }
}

const NICKNAME = /[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]+/;
const ACCOUNT = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const PASSWORD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;

export default withFormik({
  mapPropsToValues: () => ({
    nickname: "",
    account: "",
    password1: "",
    password2: "",
  }),
  validationSchema: Yup.object().shape({
    nickname: Yup.string()
      .matches(NICKNAME, "昵称长度为4-32个字符且只能输入中文、字母、数字！")
      .required("昵称为必填项"),
    account: Yup.string()
      .matches(ACCOUNT, "不是正确的Email格式！")
      .required("账号为必填项"),
    password1: Yup.string()
      .matches(PASSWORD, "密码长度为6到32,且包含字符、数字或_！")
      .required("密码为必填项"),
    password2: Yup.string()
      .matches(PASSWORD, "密码长度为6到32,且包含字符、数字或_！")
      .required("密码为必填项"),
  }),
  handleSubmit: (values, { props }) => {
    if (values.password1 !== values.password2) {
      return Toast.info("两次输入的密码不一致！", 1.5);
    }

    axios
      .post("/user/register", {
        email: values.account,
        password: values.password2,
        nickname: values.nickname,
      })
      .then((result) => {
        if (result.error_code === 0) {
          Toast.info("注册成功", 1.5);

          setTimeout(() => {
            props.history.goBack();
          }, 500);
        } else {
          Toast.info("注册失败", 1.5);
        }
      })
      .catch((err) => {
        Toast.info("注册失败", 1.5);
      });
  },
})(Login);
