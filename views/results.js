'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} = React;

var PEOPLE_URL = "https://radiant-inferno-7719.firebaseio.com/people.json";
var VOTES_URL = "https://radiant-inferno-7719.firebaseio.com/votes.json";

var resultsView = React.createClass({
    getInitialState: function() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        results: [],
        voteList: {}
      };
    },
    componentDidMount: function() {
      this.fetchData();
    },
    sortData: function (a, b) {
      if (a.total > b.total) {
        return -1;
      }
      if (a.total < b.total) {
        return 1;
      }
      // a must be equal to b
      return 0;
    },
    fetchData: function() {
      fetch(VOTES_URL)
        .then((response) => response.json())
        .then((responseData) => {
          var data = responseData;

          // iterate through votes and add to the persons total, or create a new record for them
          for (var personsVotes in responseData) {
            if (responseData.hasOwnProperty(personsVotes)) {
              var singleVote = responseData[personsVotes];

              for (var vote in singleVote) {
                if (singleVote.hasOwnProperty(vote)) {
                  var thisVote = singleVote[vote];

                  if (this.state.voteList[thisVote.selectedPerson]) {
                    this.state.voteList[thisVote.selectedPerson].total += thisVote.voteCount;
                  } else {
                    this.state.voteList[thisVote.selectedPerson] = {
                      name: thisVote.selectedPerson,
                      total: thisVote.voteCount
                    };
                  }
                }
              }
            }
          }


        }).done(() => {
          // push votelist into array
          for (var person in this.state.voteList) {
            if (this.state.voteList.hasOwnProperty(person)) {
                this.state.results.push(this.state.voteList[person]);
            }
          }
          this.setState({
            loaded: true,
            dataSource: this.state.dataSource.cloneWithRows(this.state.results.sort(this.sortData))
          });
        });

    },
    renderLoadingView: function() {
      return (
        <View style={styles.flex1}>
          <View style={styles.loading}>
            <Text>
              Loading the results...
            </Text>
          </View>
        </View>
      );
    },
    renderRow: function(data) {
      return (
        <View>
          <View style={styles.row}>
            <Text style={styles.votes}>
              {data.total}
            </Text>
            <Text style={styles.name}>
              {data.name}
            </Text>
          </View>
        </View>
      );
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
  votes: {
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


module.exports = resultsView;