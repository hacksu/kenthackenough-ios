'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
  Image
} = React;

class Schedule extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./testImage/schedule.png')}
        style={styles.testImage}>
        </Image>
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
    backgroundColor: '#231F20',
    paddingVertical: 20
  },
  testImage: {
    flex:1,
    resizeMode: Image.resizeMode.contain
  }
})

module.exports = Schedule
