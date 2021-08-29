import React, { Component } from "react";
import style from "./index.module.scss";
import TabsCom from "../../components/TabsCom";
import Header from "../../components/Header";
import { List, Button, Toast } from "antd-mobile";

const Item = List.Item;

class News extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [{ title: "标签管理" }, { title: "已关注标签" }],
      tagList: [],
    };
  }

  componentDidMount() {
    // 获取标签类型
    this.getTagList();
  }

  // 获取标签列表
  getTagList = async () => {
    const result = await this.$axios.get("/tag/list");

    if (result.error_code !== 0) {
      return Toast.info("数据请求错误!", 1.5);
    }

    this.setState({
      tagList: result.data.rows,
    });
  };

  toArtList = (data) => {
    this.props.history.push({
      pathname: `/my/tagArtList/${data.tag_type}/${data.tag_name}`,
    });
  };

  renderTabsContent = () => {
    const { tagList } = this.state;

    return (
      <>
        {tagList.length > 0 &&
          tagList.map((item) => {
            if (![10000, 10001].includes(item.tag_type)) {
              return (
                <List
                  key={item.tag_type}
                  className="my-list"
                  onClick={() => {
                    this.toArtList(item);
                  }}
                >
                  <Item
                    extra={
                      <Button disabled type="ghost" size="small" inline>
                        已关注
                      </Button>
                    }
                    multipleLine
                    onClick={() => {}}
                  >
                    {item.tag_name}
                  </Item>
                </List>
              );
            }
          })}
      </>
    );
  };

  onTabChange = () => {};

  render() {
    const { tabs } = this.state;

    return (
      <div className={style.news}>
        <Header title="标签管理" isBack />
        <TabsCom
          tabs={tabs}
          tabSize={2}
          swipeable={false}
          renderTabsContent={this.renderTabsContent}
          onChange={this.onTabChange}
        />
      </div>
    );
  }
}

export default News;
