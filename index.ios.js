/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var HomeView = require('./views/home.js');
var {
  AppRegistry,
  Navigator,
} = React;

var balnarring2015 = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'HomeView', component: HomeView}}
        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
            if (route.component) {
              return React.createElement(route.component, { navigator });
            }
        }}
      />
    );
  }
});

AppRegistry.registerComponent('balnarring2015', () => balnarring2015);
