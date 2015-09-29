'use strict';

var React = require('react-native');
var ScheduleList = require('./ScheduleList.js');

var {
  AppRegistry,
  TabBarIOS,
  Component,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  AlertIndicatorIOS,
  ActivityIndicatorIOS,
  AlertIOS,
  StyleSheet,
  NavigatorIOS,
  StatusBarIOS
} = React;


var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Schedule extends Component {
  render() {
      return (
          <NavigatorIOS
              style={styles.container}
              initialRoute={{
          title: 'Featured Books',
          component: ScheduleList
      }}/>
      );
  }
}

module.exports = Schedule
