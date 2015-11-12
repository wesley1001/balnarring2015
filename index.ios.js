/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
// var HomeView = require('./views/home.js');
var ListView = require('./components/ListView');
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

var HomeView = React.createClass({
    goToFeedView: function() {
      this.props.navigator.push({
            name: 'FeedView',
            component: FeedView
        });
    },
    goToSchedule: function() {
      this.props.navigator.push({
            name: 'ScheduleView',
            component: ScheduleView
        });
    },
    render: function() {
      return (
        <View style={styles.container}>
            <Text>I am the Home Page</Text>
            <Text onPress={this.goToFeedView}>
              Feed View
            </Text>
            <Text onPress={this.goToSchedule}>
              Schedule
            </Text>
        </View>
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
          title: "Breakfast",
          description: "This is when we eat bacon and eggs"
      },
      {
        title: "Photo Time",
        description: "Dress up in your best party gear - for glamour and glory!"
      },
      {
        title: "Bus Departs",
        description: "The bus leaves from 190 Hotham St, Elsternwick"
      },
      ]
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rowsData)
        });
    },
    _renderSectionHeader: function(data: any, section: string) {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>
            {section.toUpperCase()}
          </Text>
        </View>
      );
    },
    renderRow: function(data) {
      return (
        <View >
          <TouchableHighlight>
            <View style={styles.row}>
              <Text style={styles.rowTitleText}>
                {data.title}
              </Text>
              <Text style={styles.rowDetailText}>
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
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      );
    }
});

var FeedView = React.createClass({
    goHome: function() {
      this.props.navigator.popToTop();
    },
    render: function() {
        return (
            <View style={styles.container}>
              <Text>I am the Feed View</Text>
                <Text>
                    Heyo View
                </Text>
                <Text onPress={this.goHome}>
                    Home
                </Text>
            </View>
        );
    }
});






var styles = StyleSheet.create({
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
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20,
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
