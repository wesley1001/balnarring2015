'use strict';

var React = require('react-native');
var Navigator = require('../components/navigator.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var HomeView = React.createClass({
    goToFeedView: function() {
      this.props.navigator.push({
            name: 'FeedView',
            component: FeedView
        });
    },
    goToSchedule: function() {
      this.props.navigator.push({
            name: 'FeedView',
            component: FeedView
        });
    },
    render: function() {
      return (
        <View style={styles.container}>
            <Text>I am the Home Page</Text>
            <Text onPress={this.goToFeedView}>
              Feed View
            </Text>
            <Text onPress={this.goToSchedule}>
              Schedule
            </Text>
        </View>
      );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = HomeView;