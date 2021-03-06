'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var HOME_URL = "https://khe.io/info"


var {
  StyleSheet,
  Text,
  View,
  Component,
  WebView,
  ActivityIndicatorIOS
} = React;

class Links extends Component {

  componentWillMount() {
    this.setState({
      url: HOME_URL,
      loading: true,
      status: 'No Page Loaded'
    })
  }


  render() {

    return (
      <View style={styles.container}>
      <WebView
        style={styles.webStyle}
        url={this.state.url}
        startInLoadingState={true}
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
    backgroundColor: '#222222',
    flexDirection: 'column',
    paddingVertical: 20,
  },
  webStyle: {
    flex: 1,
    backgroundColor: '#222222',
    marginBottom: 10
  },
  buttonStyle: {
    color: 'white',
    textAlign: 'left',
    backgroundColor: '#222222',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 40
  }
})

module.exports = Links
