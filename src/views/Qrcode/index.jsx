import React, { Component } from "react";
import style from "./index.module.scss";
import Header from "../../components/Header";
import QRCode from "qrcode.react";

class Qrcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: window.location.href,
    };
  }

  render() {
    const { path } = this.state;

    return (
      <div className={style.qrcodeWrapper}>
        <Header isBack title="动态分享" />
        <div className={style.content}>
          <QRCode
            id="qrCode"
            value={path}
            size={200}
            fgColor="#000000"
            style={{ margin: "auto" }}
            // imageSettings={{
            //   src: "logoUrl",
            //   height: 100,
            //   width: 100,
            //   excavate: true,
            // }}
          />
        </div>
      </div>
    );
  }
}

export default Qrcode;
