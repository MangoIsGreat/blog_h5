import React, { Component } from "react";
import { WingBlank, Flex, Modal } from "antd-mobile";
import { getHistory, removeHistory } from "../../../../utils/store";
import styles from "./index.module.scss";

const alert = Modal.alert;

class history extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyList: [],
    };
  }

  componentDidMount() {
    // 获取搜索历史
    this.getHistory();
  }

  getHistory = () => {
    const historyData = JSON.parse(getHistory()).reverse();

    this.setState({
      historyList:
        historyData.length > 20 ? historyData.slice(0, 19) : historyData,
    });
  };

  clearHistory = () => {
    //   debugger
    // alert("提示", "你确认删除所有的历史吗?", [
    //   { text: "取消", onPress: () => console.log("cancel") },
    //   {
    //     text: "确定",
    //     onPress: () => removeHistory(),
    //   },
    // ]);
    alert('Delete', 'Are you sure???', [
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
        { text: 'OK', onPress: () => console.log('ok') },
      ]);
  };

  render() {
    const { historyList } = this.state;

    return (
      <WingBlank size="lg" className={styles.history}>
        <Flex style={{ height: "100%" }}>
          <Flex.Item>搜索历史</Flex.Item>
          <Flex.Item align="end">
            <i
              onClick={() => this.clearHistory()}
              className="iconfont icon-shezhi"
            ></i>
          </Flex.Item>
        </Flex>
        <div className={styles.list}>
          {historyList.length > 0 &&
            historyList.map((item, index) => {
              return (
                <div className={styles.listItem}>
                  <div key={index} className={styles.innerBox}>
                    {item}
                  </div>
                </div>
              );
            })}
        </div>
      </WingBlank>
    );
  }
}

export default history;
