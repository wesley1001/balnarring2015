'use strict';

var React = require('react-native');
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
			<View style={styles.container}>
				<Image style={styles.photo} source={{uri: this.props.image}} resizeMode="contain">

				</Image>
			</View>
		);
	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  photo: {
  	flex: 1,
  },
});


module.exports = MyPhoto;
