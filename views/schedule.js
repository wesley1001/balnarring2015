'use strict';

var React = require('react-native');
var MyTopHeader = require('../components/header');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} = React;

var SCHEDULE_URL = "https://radiant-inferno-7719.firebaseio.com/schedule.json";

var ScheduleView = React.createClass({
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
    fetchData: function() {
      fetch(SCHEDULE_URL)
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
        <View style={styles.loading}>
          <Text>
            Loading Schedule...
          </Text>
        </View>
      );
    },
    renderRow: function(data) {
      var raceData;

      if (data.raceData) {
        raceData =
        <View style={styles.raceData}>
          <Text>Name: {data.raceData.name}</Text>
          <Text>Length: {data.raceData.length}</Text>
          <Text>Hot Tip: {data.raceData.tip}</Text>
        </View>;
      }

      return (
        <View>
          <TouchableHighlight>
            <View style={styles.row}>

              <View style={styles.rowHeader}>
                <Text style={styles.rowTitleText}>
                  {data.title}
                </Text>
                <Text style={styles.rowTime}>
                  {data.time}
                </Text>
              </View>

              {raceData}

              <Text style={styles.rowDescription}>
                {data.description}
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
          <MyTopHeader back={this.goBack} left={'< Back'} title={'Schedule'} />
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
    flex: 1
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopColor: "#eee",
    borderTopWidth: 1
  },
  rowHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
  },
  rowDescription: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20,
  },
  rowTime: {
    fontSize: 13
  },
  raceData: {
    fontSize: 15
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


module.exports = ScheduleView;