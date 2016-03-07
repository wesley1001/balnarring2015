'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView
} = React;

var sections = [
  { title: "The Balnarring Picnic Races",
    description: "Arguably the best picnic racing course in Victoria with a proud history of over 150 years of racing. The racetrack is 2000m around and races consist off journeys of 1000, 1200 1600 and 2000 metres. Gates open at 10am and the first race commences at 1pm. You are welcome to bring your own food and drinks, and there is no strict dress code."
  },
  { title: "The Theme",
    description: "A different theme is selected each year and eveyone encouraged to wear something fun. The theme for this year is: I can't believe you wore that!"
  },
  {
    title: "The Balnarring Champion",
    description: "At the end of Balnarring Races, one person will be crowned in glory and all others must bow down before their brilliance and pay fealty to the new Champion. For the first time this year we will be implementing a voting system, so you have the opportunity to have your say in who will receive this ultimate honour. Please note that a person's performance across the entire day should be taken into account when casting your vote."
  }
]

var AboutView = React.createClass({
    getInitialState: function() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }).cloneWithRows(sections),
        loaded: false,
      };
    },
    renderRow: function(data) {
      return (
        <View style={styles.row}>

          <View style={styles.rowHeader}>
            <Text style={styles.rowTitleText}>
              {data.title}
            </Text>
          </View>

          <Text style={styles.rowDescription}>
            {data.description}
          </Text>
        </View>
      );
    },

    render: function() {

      return (
        <View style={styles.flex1}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    },
});

var styles = StyleSheet.create({
  flex1: {
    flex: 1,
    marginTop:64
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
    marginBottom: 10
  },
  rowDescription: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20
  }
});


module.exports = AboutView;
