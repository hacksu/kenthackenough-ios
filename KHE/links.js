'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var HOME_URL = "http://www.google.com"

var {
  StyleSheet,
  Text,
  View,
  Component,
  WebView
} = React;

class Links extends Component {

  componentWillMount() {
    this.setState({
      url: HOME_URL,
      loading: true,
      status: 'No Page Loaded'
    })
  }

  webviewRenderError

  render() {

    return (
      <View style={styles.container}>
      <WebView
        style={styles.webStyle}
        url={this.state.url}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
      <Button style={styles.buttonStyle} onPress={this._handlePress.bind(this)}>
        Back to Links
      </Button>
      </View>
    )
  }

  _handlePress(event) {
    this.setState({
      url: HOME_URL,
    }
  )}

  onNavigationStateChange(navState) {
    this.setState({
      url: navState.url,
      title: navState.title,
      loading: navState.loading
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
    paddingVertical: 20
  },
  webStyle: {
    flex: 1,
    //marginTop: 10,
    backgroundColor: '#231F20',
    marginBottom: 10
  },
  buttonStyle: {
    color: 'white',
    textAlign: 'left',
    backgroundColor: '#231F20',
    fontSize: 15,
    textAlign: 'center',
    //paddingLeft: 20,
    marginBottom: 40
  }
})

module.exports = Links
