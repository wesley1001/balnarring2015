/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// var HomeView = require('./views/home.js');
var ListView = require('./components/ListView');
var MyTopHeader = require('./components/header');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ListView
} = React;

var balnarring2015 = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'ScheduleView', component: ScheduleView}}
        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
            // count the number of func calls
            console.log(route, navigator);

            if (route.component) {
              return React.createElement(route.component, { navigator });
            }
        }}
      />
    );
  }
});



var ScheduleView = React.createClass({
    getInitialState: function() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        })
      };
    },
    componentDidMount: function() {
      // this.fetchData();
      var rowsData = [{
          title: "Arrive at 190 Hotham Street",
          description: "Champagne breakfast in the backyard. Dress up in your best party gear - for glamour and for glory!",
          time: "9:00am",
      },
      {
        title: "Photo Time",
        description: "One for the history books. Group photo to be taken with everyone in costume. Please ensure that you are here on time.",
        time: "9:45am"
      },
      {
        title: "Bus Departs",
        description: "The bus will be departing at 10am sharp. Toot toot! This year the bus will be towing a trailer, so we should have more room inside.",
        time: "10:00am"
      },
      {
        title: "Arrive at Racecourse",
        description: "The bus will arrive at Balnarring at approximately 11 o'clock. We'll stake our claim on some prime real estate on the lawn, and prepare for the day.",
        time: "11:00am"
      },
      {
        title: "Race 1",
        description: "The Balnarring Cup Race 1",
        time: "1:00pm",
        raceData: {
          name: "Flinders Trophy Race",
          length: "1200m",
          tip: "6 - Pumpernickel's Revenge"
        }
      },
      {
        title: "Race 2",
        description: "The Balnarring Cup Race 2",
        time: "TBC",
        raceData: {
          name: "Flinders Trophy Race",
          length: "2000m",
          tip: "6 - Pumpernickel's Revenge"
        }
      },
      {
        title: "Race 3",
        description: "The Balnarring Cup Race 3",
        time: "TBC",
        raceData: {
          name: "Flinders Trophy Race",
          length: "1600m",
          tip: "6 - Pumpernickel's Revenge"
        }
      },
      {
        title: "Race 4",
        description: "The Balnarring Cup Race 4",
        time: "TBC",
        raceData: {
          name: "Flinders Trophy Race",
          length: "1200m",
          tip: "6 - Pumpernickel's Revenge"
        }
      },
      {
        title: "Race 5",
        description: "The Balnarring Cup Race 5",
        time: "TBC",
        raceData: {
          name: "Flinders Trophy Race",
          length: "1200m",
          tip: "6 - Pumpernickel's Revenge"
        }
      },
      {
        title: "Race 6",
        description: "The Balnarring Cup Race 6",
        time: "TBC",
        raceData: {
          name: "Flinders Trophy Race",
          length: "2000m",
          tip: "6 - Pumpernickel's Revenge"
        }
      },
      {
        title: "Leave Balnarring",
        description: "Pile back into the bus for some rowdy singalongs on the way home. Don't get any spew in the bus!",
        time: "5:00pm",
      },
      {
        title: "Arrive in Elsternwick",
        description: "The bus arrives back at Hotham St.",
        time: "6:00pm",
      },
      {
        title: "Awards Ceremony",
        description: "The presentation of the prestigious Balnarring Champion will take place, presented by the previous year's winner.",
        time: "6:30pm",
      },
      {
        title: "After Party",
        description: "Pizzas and more fun in the backyard until we all fall asleep.",
        time: "7:00pm",
      },
      ]
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rowsData)
        });
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
          <View style={styles.separator} />
        </View>
      );
    },

    render: function() {
      return (
        <View style={styles.flex1}>
          <MyTopHeader left={'< Back'} />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },



  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  sectionHeader: {
    padding: 5,
  },
  group: {
    backgroundColor: 'white',
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 11,
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
  searchRow: {
    backgroundColor: '#eeeeee',
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
  },


});

AppRegistry.registerComponent('balnarring2015', () => balnarring2015);
