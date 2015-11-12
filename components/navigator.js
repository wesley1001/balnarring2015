var React = require('react-native');
var HomeView = require('../views/home.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var Navigator = React.createClass({
  render: function() {
    return (
      <Navigator
      initialRoute={{name: 'HomeView', component: HomeView}}
      configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
      }}
      renderScene={(route, navigator) => {
          // count the number of func calls
          console.log(route, navigator);

          if (route.component) {
            return React.createElement(route.component, { navigator });
          }
      }}
    />
    )
  }
});

module.exports = Navigator;