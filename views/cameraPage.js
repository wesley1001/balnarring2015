var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeModules
} = React;
var Camera = require('react-native-camera');
var VoteView = require('../views/voteMain.js');
var PhotoView = require('./photo');
var NavBarButton = require('../components/NavBarButton');



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
    this.refs.cam.capture((err, data) =>{
      console.log(err, data);
      if (err) { alert('Uh oh, there was an error taking this picture...'); return}
      if (data) {
        this.props.navigator.push({
            name: 'PhotoView',
            component: PhotoView,
            title: 'Photo',
            passProps: {
              image: data
            },
        });
      }
    });
  },
  uploadPicture: function(uri) {
    var obj = {
      uri: uri, // either an 'assets-library' url (for files from photo library) or an image dataURL
      uploadUrl: '',
      fileName: Date.now(),
      mimeType: "image",
      headers: {
        authorization: 'bearer '+token
      },
      data: {
          // whatever properties you wish to send in the request
          // along with the uploaded file
      }
    };
    React.FileTransfer.upload(obj, (err, res) => {
        // handle response
        // it is an object with 'status' and 'data' properties
        // if the file path protocol is not supported the status will be 0
        // and the request won't be made at all
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