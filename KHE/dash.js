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
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./testImage/shortLogo.png')}
        style={styles.logoImage}>
        </Image>
        <Text style={styles.description}>
        Welcome to Kent Hack Enough!
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
  container: {
    flex: 1,
    //justifyContent: 'center',
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
