import React, { Component } from "react";
import { Tabs } from "antd-mobile";
import PropTypes from "prop-types";

class TabsCom extends Component {
  constructor() {
    super();

    this.state = {
      classifyActiveTab: 0,
    };
  }

  tabClick = (tab, index) => {
    this.setState({
      classifyActiveTab: index,
    });
  };

  renderContent = () => {
    return this.props.renderTabsContent();
  };

  onChange = (tab, index) => {
    this.setState({
      classifyActiveTab: index,
    });

    this.props.onChange(tab, index);
  };

  render() {
    const { classifyActiveTab } = this.state;
    const { tabs, tabSize, swipeable } = this.props;

    return (
      <Tabs
        tabs={tabs}
        onTabClick={this.tabClick}
        onChange={this.onChange}
        swipeable={swipeable}
        tabBarUnderlineStyle={{
          width: `${100 / tabSize}vw`,
          left: `calc(${classifyActiveTab} * ${100 / tabSize}%)`,
          border: "1px #00c58e solid",
        }}
        tabBarBackgroundColor="#F9F9F9"
        tabBarActiveTextColor="#00c58e"
        tabBarInactiveTextColor="#A0A6AF"
        renderTabBar={(props) => (
          <Tabs.DefaultTabBar {...props} page={tabSize} />
        )}
      >
        {this.renderContent()}
      </Tabs>
    );
  }
}

TabsCom.propTypes = {
  tabs: PropTypes.array.isRequired,
  tabSize: PropTypes.number.isRequired,
  renderTabsContent: PropTypes.func.isRequired,
  swipeable: PropTypes.bool.isRequired,
};

export default TabsCom;
