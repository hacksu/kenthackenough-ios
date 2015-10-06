'use strict';

var React = require('react-native');
var moment = require('moment');


var {
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    NavigatorIOS,
    ActivityIndicatorIOS
    } = React;


var SCHEDULE_URL = 'https://api.khe.io/v1.0/events';
var MESSEGES_URL = 'https://api.khe.io/v1.0/messages';

var Device = require('react-native-device');

var iphone4swidth = 320;
var iphone6width = 375;


class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // newUpdate: 'This is a new update with lots of text that hopefully wraps when it hits the end of the text box width',
      // nextEvent: 'This is the next event',
      isLoading: true,
      dataSourceMessages: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
      dataSourceSchedule: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        })
      };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(MESSEGES_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSourceMessages: responseData.messages[0].text,
                    dataSourceMessagesTime: responseData.messages[0].created,
                    isLoading: false
                });
            })
            .done();
          fetch(SCHEDULE_URL)
              .then((response) => response.json())
              .then((responseData) => {
                  this.setState({
                      dataSourceSchedule: responseData.events[0].title,
                      dataSourceScheduleTime: responseData.events[0].start,
                      isLoading: false
                  });
              })
              .done();
    }



  render() {
    var events = this.state.dataSourceSchedule;
    var update = this.state.dataSourceMessages;
    var timeAgo = moment(this.state.dataSourceMessagesTime).fromNow();
    var startTime = moment(this.state.dataSourceScheduleTime).format("h A");
    // console.log(events);
    // console.log(update);
    //console.log(Device.width);

    if (this.state.isLoading) {
      if(Device.width === iphone4swidth){
        return this.renderLoadingViewiPhone4();
      }else {
        return this.renderLoadingViewiPhone6();
      }
    }else {
      if(Device.width === iphone4swidth){
        return this.renderLoadediPhone4(events , update , startTime, timeAgo);
      }else {
        return this.renderLoadediPhone6(events , update , startTime, timeAgo);
      }

    }

  }

  renderLoadediPhone6(events , update, startTime, timeAgo) {

      return (
        <View style={styles.container}>
          <Image source={require('./testImage/shortLogo.png')}
          style={styles.logoImage}>
          </Image>



          <Text style={styles.dashHeaderiPhone6}>Latest Update</Text>
          <Text style={styles.updatesDashBoxiPhone6}>
          {update}    <Text style={styles.timeiPhone6}>-{timeAgo}</Text>
          </Text>

          <Text style={styles.dashHeaderiPhone6}>Next Event</Text>
          <Text style={styles.scheduleDashBoxiPhone6}>
          {events} at {startTime}
          </Text>
        </View>
      );
  }

  renderLoadingViewiPhone6() {
      return (
        <View style={styles.container}>
          <Image source={require('./testImage/shortLogo.png')}
          style={styles.logoImage}>
          </Image>
          <Text style={styles.dashHeaderiPhone6}>Latest Update</Text>
          <View style={styles.loadingiPhone6}>
              <ActivityIndicatorIOS
                  size='small'/>
              <Text style={styles.loadingTextiPhone6}>
                  Loading Updates...
              </Text>
          </View>

          <Text style={styles.dashHeaderiPhone6}>Next Event</Text>
          <View style={styles.loadingiPhone6}>
              <ActivityIndicatorIOS
                  size='small'/>
              <Text style={styles.loadingTextiPhone6}>
                  Loading Events...
              </Text>
          </View>

        </View>
      );
  }



  renderLoadediPhone4(events , update, startTime, timeAgo) {

      return (
        <View style={styles.container}>
          <Image source={require('./testImage/shortLogo.png')}
          style={styles.logoImage}>
          </Image>



          <Text style={styles.dashHeaderiPhone4}>Latest Update</Text>
          <Text style={styles.updatesDashBoxiPhone4}>
          {update}    <Text style={styles.timeiPhone4}>-{timeAgo}</Text>
          </Text>

          <Text style={styles.dashHeaderiPhone4}>Next Event</Text>
          <Text style={styles.scheduleDashBoxiPhone4}>
          {events} at {startTime}
          </Text>
        </View>
      );
  }

  renderLoadingViewiPhone4() {
      return (
        <View style={styles.container}>
          <Image source={require('./testImage/shortLogo.png')}
          style={styles.logoImage}>
          </Image>



          <Text style={styles.dashHeaderiPhone4}>Latest Update</Text>

          <View style={styles.loadingiPhone4}>
              <ActivityIndicatorIOS
                  size='small'/>
              <Text style={styles.loadingTextiPhone4}>
                  Loading Updates...
              </Text>
          </View>


          <Text style={styles.dashHeaderiPhone4}>Next Event</Text>

          <View style={styles.loadingiPhone4}>
              <ActivityIndicatorIOS
                  size='small'/>
              <Text style={styles.loadingTextiPhone4}>
                  Loading Events...
              </Text>
          </View>

        </View>
      );
  }



}

var styles = StyleSheet.create({
  description: {
    flex: 1,
    marginTop: 10,
    fontSize: 14.5,
    width: 300,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  updatesDashBoxiPhone6: {
    flex: .5,
    fontSize: 16,
    backgroundColor: '#222222',
    height: 100,
    width: 250,
    textAlign: 'left',
    color: 'white',
    position: 'relative',
  },
  scheduleDashBoxiPhone6: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#222222',
    height: 100,
    width: 250,
    marginBottom: 10,
    textAlign: 'left',
    color: 'white',
    position: 'relative',
  },
  dashHeaderiPhone6: {
    marginTop: 40,
    fontSize: 22,
    paddingBottom: 3,
    backgroundColor: '#222222',
    width: 250,
    textAlign: 'left',
    color: 'red',
    fontWeight: 'bold',

  },
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingVertical: 20,
  },
  logoImage: {
    flex: 1.5,
    width: 250,
    height: 100,
    marginTop: 80,
    resizeMode: Image.resizeMode.contain,
    position: 'relative',
  },
  loadingTextiPhone6: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  loadingiPhone6: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#222222',
  },
  timeiPhone6: {
      fontSize: 13,
      marginBottom: 8,
      marginTop: 8,
      color: '#A6A6A6'
  },
  updatesDashBoxiPhone4: {
    flex: .5,
    fontSize: 12,
    backgroundColor: '#222222',
    height: 100,
    width: 250,
    textAlign: 'left',
    color: 'white',
    position: 'relative',
  },
  scheduleDashBoxiPhone4: {
    flex: 1,
    fontSize: 12,
    backgroundColor: '#222222',
    height: 100,
    width: 250,
    marginBottom: 10,
    textAlign: 'left',
    color: 'white',
    position: 'relative',
  },
  dashHeaderiPhone4: {
    marginTop: 40,
    fontSize: 15,
    paddingBottom: 3,
    backgroundColor: '#222222',
    width: 250,
    textAlign: 'left',
    color: 'red',
    fontWeight: 'bold',
  },
  loadingTextiPhone4: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  loadingiPhone4: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#222222',
  },
  timeiPhone4: {
      fontSize: 10,
      marginBottom: 8,
      marginTop: 8,
      color: '#A6A6A6'
  },
})

module.exports = Dash
