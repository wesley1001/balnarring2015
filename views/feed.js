'use strict';

var React = require('react-native');
var {
  Image,
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
      })
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
      uri: data.base64
    };
    return (
      <View style={styles.item}>
        <TouchableHighlight onPress={() => this._pressRow(data)} underlayColor="transparent">
          <Image style={styles.thumb} source={imgSource} />
        </TouchableHighlight>
      </View>
    );
  },

  _pressRow: function(data) {
    console.log('THIS PICURE HAS AN ID OF: ' + data.id);
  },
});

var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee',
    marginTop: 64,
    flex: 1
  },
  item: {
    margin: 5
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 70,
    height: 70
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