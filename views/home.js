'use strict';

var React = require('react-native');
var FeedView = require('../views/feed.js');
var ScheduleView = require('../views/schedule.js');
var VoteView = require('../views/voteMain.js');
var AboutView = require('../views/about.js');
var CameraView = require('../views/cameraPage.js');
var NavBarButton = require('../components/NavBarButton');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableHighlight
} = React;


var HomeView = React.createClass({
    goToFeed: function() {
      this.props.navigator.push({
            name: 'FeedView',
            component: FeedView,
            title: 'FeedView',
            rightButton: {
              component: NavBarButton,
              passProps: {
                icon: 'awesome|camera',
                onPress: this.goToCamera,
              }
            },
        });
    },
    goToSchedule: function() {
      this.props.navigator.push({
            name: 'ScheduleView',
            component: ScheduleView,
            title: 'Schedule',
            rightButton: {
              component: NavBarButton,
              passProps: {
                icon: 'awesome|camera',
                onPress: this.goToCamera,
              }
            },
        });
    },
    goToVote: function() {
      this.props.navigator.push({
            name: 'VoteView',
            component: VoteView,
            title: 'Vote',
            rightButton: {
              component: NavBarButton,
              passProps: {
                icon: 'awesome|camera',
                onPress: this.goToCamera,
              }
            },
        });
    },
    goToAbout: function() {
      this.props.navigator.push({
            name: 'About',
            component: AboutView,
            title: 'About',
            rightButton: {
              component: NavBarButton,
              passProps: {
                icon: 'awesome|camera',
                onPress: this.goToCamera,
              }
            },
        });
    },
    goToCamera: function() {
      this.props.navigator.push({
            name: 'CameraView',
            component: CameraView,
            title: 'Camera',
        });
    },
    goHome: function() {
      this.props.navigator.popToTop();
    },
    upload: function() {
      fetch('https://balnarring.s3.amazonaws.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        })
      })
    },
    getInitialState: function() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        rowData: [
          {
            title: "Photos",
            onPress: this.goToFeed,
            backgroundColor: '#44E5E7',
            icon: 'th'
          },
          {
            title: "Camera",
            onPress: this.goToCamera,
            backgroundColor: '#F6AE2D',
            icon: 'camera'
          },
          {
            title: "Schedule",
            onPress: this.goToSchedule,
            backgroundColor: '#E88D67',
            icon: 'list'
          },
          {
            title: "Vote",
            onPress: this.goToVote,
            backgroundColor: '#4D9DE0',
            icon: 'trophy'
          },
          {
            title: "About",
            onPress: this.goToAbout,
            backgroundColor: '#50FFB1',
            icon: 'info-circle'
          },

        ]
      };
    },
    componentDidMount: function() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.rowData)
      });
    },
    renderRow: function(data) {
      return (
        <View>
          <TouchableHighlight onPress={data.onPress}>
          <View style={[styles.row, {backgroundColor: data.backgroundColor}]}>
            <View style={styles.icon}>
              <Icon name={data.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.content}>
              {data.title}
            </Text>
          </View>
          </TouchableHighlight>
        </View>
      );
    },
    render: function() {
      return (
        <View style={styles.links}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    }
});

var styles = StyleSheet.create({

  links: {
    flex: 1,
    marginTop: 64
  },
  row: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
  },
  icon: {
    margin: 30,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    color: '#fff',
    fontSize: 20
  },
});

module.exports = HomeView;
