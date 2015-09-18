'use strict';

var React = require('react-native');
var testHTML = '<!DOCTYPE html><html><title>Kent Hack Enough Important Links Site!</title><center><body><h1>KHE resources!</h1><a href="http://www.khe.io">Kent Hack Enough Site</a><br /><br /><a href="http://www.google.com">Other Important Stuff</a><br /><br /><a href="http://www.google.com">More Important Stuff</a><br /><br /><a href="http://www.google.com">Even More Important Stuff</a></body></center></html>'

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
        style={styles.webStyle}
        html={testHTML}
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
    flexDirection: 'column',
    paddingVertical: 20
  },
  webStyle: {
    flex: 1,
    backgroundColor: '#231F20'
  }
})

module.exports = Links
