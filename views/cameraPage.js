var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;
var Camera = require('react-native-camera');
var VoteView = require('../views/voteMain.js');
var ViewPhoto = require('./photo');
var MyTopHeader = require('../components/header');


var cameraApp = React.createClass({
  getInitialState() {
    return {
      cameraType: Camera.constants.Type.back
    }
  },
  goBack: function() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <MyTopHeader back={this.goBack} left={'< Back'} style={styles.header} />
        <Camera
          ref="cam"
          style={styles.camera}
          type={this.state.cameraType}
          captureTarget={Camera.constants.CaptureTarget.disk}
        >
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js{'\n'}
            Press Cmd+R to reload
          </Text>
          <TouchableHighlight onPress={this._switchCamera}>
            <Text>The old switcheroo</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._takePicture}>
            <Text>Take Picture</Text>
          </TouchableHighlight>
        </Camera>
      </View>
    );
  },

  _switchCamera() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  },
  _takePicture: function() {
    this.refs.cam.capture(function(err, data) {
      console.log(err, data);
    });
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});

module.exports = cameraApp;