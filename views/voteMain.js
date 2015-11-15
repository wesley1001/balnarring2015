'use strict';

var React = require('react-native');
var Vote = require('../views/vote');
var Button = require('../components/button');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} = React;


var VoteView = React.createClass({
    getInitialState: function() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        rowData: [
          {
            voteCount: 3,
            selectedPerson: "Touch to select"
          },
          {
            voteCount: 2,
            selectedPerson: "Touch to select"
          },
          {
            voteCount: 1,
            selectedPerson: "Touch to select"
          }
        ]
      };
    },
    componentDidMount: function() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.rowData)
      });
    },
    showPeople: function() {
      this.props.navigator.push({
            name: 'VotePage',
            component: Vote
        })
    },
    renderRow: function(data) {
      return (
        <View>
          <TouchableHighlight onPress={this.showPeople}>
            <View style={styles.row}>
              <Text style={styles.voteCount}>
                {data.voteCount}
              </Text>
              <Text style={styles.name}>
                {data.selectedPerson}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    },

    goBack: function() {
      this.props.navigator.jumpBack();
    },
    submitVotes: function() {
      // Do nothing just yet
      return;
    },
    render: function() {
      return (
        <View style={styles.container}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
          <Button content={'Submit'} action={this.props.submitVotes} />
        </View>
      );
    }
});

var styles = StyleSheet.create({
  container: {
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
    height: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },
  voteCount: {
    fontSize: 20,
    marginRight: 30
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

})

module.exports = VoteView;