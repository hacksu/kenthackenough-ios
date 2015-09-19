'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var testHTML = '<!DOCTYPE html><html><title>Kent Hack Enough Important Links Site!</title><center><body><h1>KHE resources!</h1><a href="http://www.khe.io">Kent Hack Enough Site</a><br /><br /><a href="http://www.google.com">Other Important Stuff</a><br /><br /><a href="http://www.google.com">More Important Stuff</a><br /><br /><a href="http://www.google.com">Even More Important Stuff</a></body></center></html>'
// CHANGE TO RESOURCE SITE
var HOME_URL = "http://www.google.com"
// AS FALLBACK URL
var KHE_URL = "http://www.khe.io"

var {
  StyleSheet,
  Text,
  View,
  Component,
  WebView
} = React;

class Links extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: HOME_URL
    }
    this._handlePress = this._handlePress.bind(this)
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
      <Button style={styles.buttonStyle} onPress={this._handlePress}>
        Back to Links...
      </Button>
      <WebView
        style={styles.webStyle}
        url={this.state.url}
        onNavigationStateChange={this.onNavigationStateChange}
      />
      </View>
    )
  }

  _handlePress(state) {
    this.setState({
      url: KHE_URL,
    }
  )}

  onNavigationStateChange() {
    this.setState({
      url: HOME_URL
    })
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
    paddingVertical: 20,
    //marginTop: -20
  },
  webStyle: {
    flex: 1,
    backgroundColor: '#231F20',
  },
  buttonStyle: {
    color: 'white',
    textAlign: 'left',
    fontSize: 14,
    paddingLeft: 7
  }
})

module.exports = Links
