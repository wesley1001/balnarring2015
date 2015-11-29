'use strict';

var React = require('react-native');
if(!React.ART) {
  React.ART = require('ReactNativeART');
}
var Image = require('react-native-image-progress');
var Progress = require('react-native-progress');
var PhotoView = require('./photo');

var {
  // Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var PHOTOS_URL = "https://radiant-inferno-7719.firebaseio.com/photos.json";

var FeedView = React.createClass({


  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(PHOTOS_URL),
      loaded: false,
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(PHOTOS_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      }).catch( (error) => alert(error) )
      .done();
  },
  renderLoadingView: function() {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loading}>
          <Text>
            Loading your pics...
          </Text>
        </View>
      </View>
    );
  },
  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow: function(data) {
    var imgSource = {
      uri: data.url
    };
    return (
      <View style={styles.item}>
        <TouchableHighlight onPress={() => this._pressRow(data)} underlayColor="transparent">
          <Image
            style={styles.thumb}
            source={imgSource}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: 'rgba(150, 150, 150, 1)',
              unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }}
          />
        </TouchableHighlight>
      </View>
    );
  },

  _pressRow: function(data) {
    this.props.navigator.push({
        name: 'PhotoView',
        component: PhotoView,
        title: 'Photo',
        passProps: {
          image: data.url
        },
    });
  },
});

var styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    marginTop: 64,
  },
  item: {
    margin: 5,
    flex: 1,
    // alignItems: 'stretch'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    flex:1
  },
  thumb: {
    height: 300,
    flex: 1
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    marginTop: 64
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = FeedView;
