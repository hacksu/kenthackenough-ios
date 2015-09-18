'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
  WebView
} = React;

class Links extends Component {
  render() {
    return (
      <View style={styles.container}>
      <WebView
        url='testWebsite/linksSite.html'
      />
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
    backgroundColor: '#231F20',
    flexDirection: 'column'
  },
  webView: {
    backgroundColor: 'white',
    height: 350
  },
})

module.exports = Links
