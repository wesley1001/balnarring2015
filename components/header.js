'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var Header = React.createClass({
  render: function() {
    return (
      <View>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarButton} onPress={this.props.back}>{this.props.left}</Text>
          <Text style={styles.toolbarTitle}>{this.props.title}</Text>
          <Text style={styles.toolbarButton}>{this.props.right}</Text>
        </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  toolbar:{
        backgroundColor:'#81c04d',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarButton:{
        color:'#fff',
        textAlign:'center',
        width: 100
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    }
});

module.exports = Header;

