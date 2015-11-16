'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var Vote = require('../views/vote');
var Button = require('../components/button');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} = React;

var myFirebaseRef = new Firebase("https://radiant-inferno-7719.firebaseio.com/");

var VoteView = React.createClass({
    getInitialState: function() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        votes: [
          {
            index: 0, // for my sanity
            voteCount: 3,
            selectedPerson: "Touch to select"
          },
          {
            index: 1,
            voteCount: 2,
            selectedPerson: "Touch to select"
          },
          {
            index: 2,
            voteCount: 1,
            selectedPerson: "Touch to select"
          }
        ],
      };
    },
    componentDidMount: function() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.votes)
      });
    },
    showPeople: function(voteIndex) {
      this.props.navigator.push({
            name: 'VotePage',
            component: Vote,
            passProps: {
              votes: this.state.votes,
              voteIndex: voteIndex
            }
        })
    },
    renderRow: function(data) {
      return (
        <View>
          <TouchableHighlight onPress={() => this.showPeople(data.index)}>
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
    checkVotesAreValid: function(votes) {
        var a = votes[0].selectedPerson;
        var b = votes[1].selectedPerson;
        var c = votes[2].selectedPerson;
        var all = [a, b, c];
        if (a === b || a === c || b === c) { return false; }
        if (all.indexOf('Touch to select') > -1 ) { return false; }
        return true;
    },
    votesInvalid: function() {
      alert('Please select three unique people!');
    },
    submitVotes: function(votes, self) {
      var firebaseVotes = myFirebaseRef.child('votes');
      firebaseVotes.push(votes, function(error) {
        if (error) {
          alert('Uh oh, something went wong.');
        } else {
          alert('Thanks for voting!');
          self.props.navigator.popToTop();
        }
      })
    },
    render: function() {
      if (this.checkVotesAreValid(this.state.votes)) {
        var button = <Button content={'Submit'} action={() => this.submitVotes(this.state.votes, this)} backgroundColor={'#3BCCA6'} />;
      } else {
        var button = <Button content={'Submit'} action={this.votesInvalid} backgroundColor={'#FFB8B8'} />;
      }
      return (
        <View style={styles.container}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
          {button}
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