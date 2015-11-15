'use strict';

var React = require('react-native');
var FeedView = require('../views/feed.js');
var ScheduleView = require('../views/schedule.js');
var VoteView = require('../views/voteMain.js');
var CameraView = require('../views/cameraPage.js');
var MyTopHeader = require('../components/header');
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
            name: 'ScheduleView',
            component: ScheduleView
        });
    },
    goToVotePage: function() {
      this.props.navigator.push({
            name: 'VoteView',
            component: VoteView
        });
    },
    goToCameraPage: function() {
      this.props.navigator.push({
            name: 'CameraView',
            component: CameraView
        });
    },
    render: function() {
      return (
        <View style={styles.container}>
        <MyTopHeader title={'Home'} />
          <View style={styles.content}>
            <Text>I am the Home Page</Text>
            <Text onPress={this.goToFeedView}>
              Feed View
            </Text>
            <Text onPress={this.goToSchedule}>
              Schedule
            </Text>
            <Text onPress={this.goToVotePage}>
              Vote
            </Text>
            <Text onPress={this.goToCameraPage}>
              Camera
            </Text>
          </View>
        </View>
      );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
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