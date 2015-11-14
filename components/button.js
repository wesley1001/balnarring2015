'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = React;

var MyButton = React.createClass({
	render: function() {
		return (
			<TouchableOpacity style={styles.button} onPress={this.props.action}>
				<Text style={styles.content}> {this.props.content} </Text>
			</TouchableOpacity>
		)
	}
});

var styles = StyleSheet.create({
	button: {
		height: 75,
		backgroundColor: '#eee',
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	content: {
		fontWeight: 'bold',
		fontSize: 20
	}
});


module.exports = MyButton;