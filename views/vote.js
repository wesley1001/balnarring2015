'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Image
} = React;

var PEOPLE_URL = "https://radiant-inferno-7719.firebaseio.com/people.json";

var VotePage = React.createClass({
    getInitialState: function() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      };
    },
    componentDidMount: function() {
      this.fetchData();
    },
    sortData: function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    },
    fetchData: function() {
      fetch(PEOPLE_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sortData)),
            loaded: true,
          });
        })
        .done();
    },
    renderLoadingView: function() {
      return (
        <View style={styles.flex1}>
          <View style={styles.loading}>
            <Text>
              Loading some legends...
            </Text>
          </View>
        </View>
      );
    },
    selectPerson: function() {
      return;
    },
    renderRow: function(data) {
      return (
        <View>
          <TouchableHighlight onPress={this.selectPerson}>
            <View style={styles.row}>
              <Image source={require('./../images/person-icon.png') } style={styles.image} />
              <Text style={styles.name}>
                {data.name}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    },

    goBack: function() {
      this.props.navigator.pop();
    },

    render: function() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }

      return (
        <View style={styles.flex1}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    }
});

var styles = StyleSheet.create({
  flex1: {
    flex: 1,
    marginTop: 64
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  row: {
    backgroundColor: 'white',
    borderTopColor: "#eee",
    borderTopWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    marginRight: 20
  },
  name: {
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


module.exports = VotePage;