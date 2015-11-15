'use strict';

var React = require('react-native');
var MyTopHeader = require('../components/header');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} = React;

var MyPhoto = React.createClass({
	render: function() {
		return (
			<View>
				<MyTopHeader />
				<Image source={{uri: 'https://i.stack.imgur.com/XA5Jn.jpg?s=32&g=1' }} />
			</View>
		);
	}
});



module.exports = MyPhoto;