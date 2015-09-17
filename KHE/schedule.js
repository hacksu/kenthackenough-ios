'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component
} = React;

class Schedule extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.description}>
      Welcome to the SCHEDULE
      </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#231F20'
  }
})

module.exports = Schedule
