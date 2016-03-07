var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');
var FeedView = require('../views/feed.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeModules
} = React;
var Camera = require('react-native-camera');
var PhotoView = require('./photo');
var NavBarButton = require('../components/NavBarButton');



var cameraApp = React.createClass({
  getInitialState() {
    return {
      cameraType: Camera.constants.Type.back
    }
  },
  goToFeed() {
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
  goToCamera() {
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
          <View style={styles.spacer} />
          <View style={styles.bottomBar}>
            <TouchableHighlight onPress={this._switchCamera} style={styles.sideIcon}>
              <Icon name={'repeat'} size={25} color="#fff" />
            </TouchableHighlight>
            <TouchableHighlight onPress={this._takePicture} style={styles.cameraIcon}>
              <Icon name={'camera'} size={40} color="#fff" />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.goToFeed} style={styles.sideIcon}>
              <Icon name={'th'} size={25} color="#fff" />
            </TouchableHighlight>
          </View>
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
      if (err) { alert('Uh oh, there was an error taking this picture...'); return;}
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
    flexDirection: 'column',
    // alignItems: 'flex-end'
  },
  spacer: {
    flex: 1
  },
  bottomBar: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 64,
    height: 75,
    justifyContent: 'space-between',
  },
  cameraIcon: {
    alignItems: 'center',
  },
  sideIcon: {
    paddingHorizontal: 20
  }
});

module.exports = cameraApp;
