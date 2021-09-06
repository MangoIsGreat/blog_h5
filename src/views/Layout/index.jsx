import React, { Component, Suspense } from "react";
import { TabBar } from "antd-mobile";
import style from "./index.module.scss";
import "../../assets/css/iconfont/iconfont.css";
import { Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
const Home = React.lazy(() => import("../Home/index"));
const Interaction = React.lazy(() => import("../Interaction"));
const Find = React.lazy(() => import("../Find"));
const News = React.lazy(() => import("../News"));
const My = React.lazy(() => import("../My"));

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
      path: "/layout/find",
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

  routes = [
    {
      path: "/layout/index",
      component: Home,
    },
    {
      path: "/layout/interaction",
      component: Interaction,
    },
    {
      path: "/layout/find",
      component: Find,
    },
    {
      path: "/layout/news",
      component: News,
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
      <div className={style.layout}>
        {/* 路由规则 */}
        <Suspense fallback={<div></div>}>
          <CacheSwitch>
            {this.routes.map((item, index) => {
              const Component = item.component;
              return (
                <CacheRoute path={item.path} key={index} exact when="back">
                  {(props) => {
                    return (
                      <div style={props.match ? null : { display: "none" }}>
                        <Component {...props} />
                      </div>
                    );
                  }}
                </CacheRoute>
              );
            })}
            <Route path="/layout/my" component={My} />
            <Redirect exact from="/layout" to="/layout/index" />
          </CacheSwitch>
        </Suspense>

        {/* 渲染TabBar */}
        {this.renderTabBar()}
      </div>
    );
  }
}

export default Layout;
