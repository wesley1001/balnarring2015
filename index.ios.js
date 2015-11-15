/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var HomeView = require('./views/home.js');
var NavigationBar = require('./components/navbar');
var NavBarButton = require('./components/NavBarButton');
var CameraView = require('./views/cameraPage.js');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Navigator,
  Text,
  View
} = React;

var balnarring2015 = React.createClass({
  _renderScene: function(route, navigator) {
      var props = Object.assign({}, { navigator: navigator }, route.passProps);
      return React.createElement(route.component, props);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{
            name: 'HomeView',
            component: HomeView,
            title: 'Balnarring 2015',
          }}
          navigationBar={<NavigationBar />}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
      flex: 1
  },
});

AppRegistry.registerComponent('balnarring2015', () => balnarring2015);
