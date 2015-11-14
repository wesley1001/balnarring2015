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