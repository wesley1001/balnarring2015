'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var FeedView = React.createClass({
    goHome: function() {
      this.props.navigator.popToTop();
    },
    render: function() {
        return (
            <View style={styles.container}>
              <Text>I am the Feed View</Text>
                <Text>
                    Heyo View
                </Text>
                <Text onPress={this.goHome}>
                    Home
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
})

module.exports = FeedView;