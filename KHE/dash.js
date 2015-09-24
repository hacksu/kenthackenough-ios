'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
  Image
} = React;

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUpdate: 'This is a new update with lots of text that hopefully wraps when it hits the end of the text box width',
      nextEvent: 'This is the next event'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./testImage/shortLogo.png')}
        style={styles.logoImage}>
        </Image>

        <Text style={styles.description}>
        Welcome to Kent Hack Enough!
        </Text>

        <Text style={styles.dashHeader}>Latest Update!</Text>
        <Text style={styles.dashBox}>
        {this.state.newUpdate}
        </Text>

        <Text style={styles.dashHeader}>Next Event!</Text>
        <Text style={styles.dashBox}>
        {this.state.nextEvent}
        </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  description: {
    marginTop: 10,
    fontSize: 14.5,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  dashBox: {
    //flex: 1,
    fontSize: 14.5,
    backgroundColor: 'red',
    height: 80,
    width: 250,
    textAlign: 'left',
    color: '#FFFFFF'
  },
  dashHeader: {
    marginTop: 50,
    fontSize: 14.5,
    backgroundColor: 'white',
    width: 250,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#231F20',
    paddingVertical: 20
  },
  logoImage: {
    flex:0,
    width: 300,
    height: 100,
    marginTop: 80,
    resizeMode: Image.resizeMode.contain
  }
})

module.exports = Dash
