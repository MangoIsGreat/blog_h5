import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../Home";
import Interaction from "../Interaction";
import Found from "../Found";
import News from "../News";
import My from "../My";
import NotFound from "../NotFound";
// import style from "./index.module.scss";
import "../../assets/css/iconfont/iconfont.css";

class Layout extends Component {
  constructor(props) {
    super();

    this.state = {
      selectedPath: props.location.pathname,
    };
  }

  TABS = [
    {
      title: "首页",
      icon: "icon-shouye-",
      path: "/layout/index",
    },
    {
      title: "互动",
      icon: "icon-dilanxianxingiconyihuifu_huabanfuben",
      path: "/layout/interaction",
    },
    {
      title: "发现",
      icon: "icon-fangdajing",
      path: "/layout/found",
    },
    {
      title: "资讯",
      icon: "icon-zixun",
      path: "/layout/news",
    },
    {
      title: "我的",
      icon: "icon-wode",
      path: "/layout/my",
    },
  ];

  renderTabBar = () => {
    return (
      <TabBar tintColor="#00c58e" noRenderContent={true}>
        {this.TABS.map((item) => {
          return (
            <TabBar.Item
              title={item.title}
              key={item.path}
              icon={<i className={`iconfont ${item.icon}`} />}
              selectedIcon={<i className={`iconfont ${item.icon}`} />}
              selected={this.state.selectedPath === item.path}
              onPress={() => {
                this.setState({
                  selectedPath: item.path,
                });

                if (this.state.selectedPath !== item.path) {
                  this.props.history.push(item.path);
                }
              }}
            ></TabBar.Item>
          );
        })}
      </TabBar>
    );
  };

  render() {
    return (
      <div>
        <div style={{ height: "500px" }}>
          <Switch>
            <Route path="/layout/index" component={Home} />
            <Route path="/layout/interaction" component={Interaction} />
            <Route path="/layout/found" component={Found} />
            <Route path="/layout/news" component={News} />
            <Route path="/layout/my" component={My} />
            <Redirect exact from="/layout" to="/layout/index" />
            <Route component={NotFound} />
          </Switch>
        </div>

        {/* 渲染TabBar */}
        {this.renderTabBar()}
      </div>
    );
  }
}

export default Layout;
