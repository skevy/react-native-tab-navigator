'use strict';

import React from 'react-native';
let {
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

import autobind from 'autobind-decorator';

import Layout from './Layout';

export default class Tab extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    badge: PropTypes.element,
    onPress: PropTypes.func,
  };

  render() {
    let { title, badge } = this.props;
    let icon = React.Children.only(this.props.children);

    if (title) {
      title =
        <Text
          numberOfLines={1}
          style={[styles.title, this.props.titleStyle]}>
          {title}
        </Text>;
    }

    if (badge) {
      badge = React.cloneElement(badge, {
        style: [styles.badge, badge.style],
      });
    }

    let tabStyle = [styles.container, title ? null : styles.untitledContainer];
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this._handlePress}
        style={tabStyle}>
        <View>
          {icon}
          {badge}
        </View>
        {title}
      </TouchableOpacity>
    );
  }

  @autobind
  _handlePress(event) {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }
}

let styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  untitledContainer: {
    paddingBottom: 13,
  },
  title: {
    color: '#929292',
    fontSize: 10,
    textAlign: 'center',
    alignSelf: 'stretch',
    marginTop: 4,
    marginBottom: 1 + Layout.pixel,
  },
});
