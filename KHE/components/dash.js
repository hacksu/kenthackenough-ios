'use strict';

var React = require('react-native');
var moment = require('moment');
var Button = require('react-native-button');



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
      dataSourceMessages: '',
      dataSourceMessagesTime: '',
      dataSourceSchedule: []
      };
    }

    componentDidMount() {
        this.fetchData();

    }

    componentWillReceiveProps(props) {

      //console.log('componentWillReceiveProps Dash');
      this.fetchData();

    }

    fetchData() {
      //console.log('fetch Dash');
        fetch(MESSEGES_URL)
            .then((response) => response.json())
            .then((responseData) => {
              var _ds = JSON.parse(JSON.stringify(responseData));
                this.setState({
                    dataSourceMessages: _ds.messages[0].text,
                    dataSourceMessagesTime: _ds.messages[0].created,
                    isLoading: false
                });
            })
            .done();
          fetch(SCHEDULE_URL)
              .then((response) => response.json())
              .then((responseData) => {
                var _dsTimes = responseData;
                  this.setState({
                      dataSourceSchedule: _dsTimes,
                      isLoading: false
                  });
                  //console.log(_dsTimes);
              })
              .then(this.fetchNextEvent() )
              .done();
    }

    fetchNextEvent() {
      //console.log("in fetchNextEvent");
      //console.log(this.state.dataSourceSchedule);
      //var TodaysDate = moment().date();
      //var TodaysDate = 10;
      //console.log("today");
      //prod time string
      var todaysDateISO = moment().format();
      //dev time string
      //var todaysDateISO = '2015-10-10T14:00:00-04:00';
      //console.log("date");
      //console.log(todaysDateISO);
      var ScheduleObject = [];
      ScheduleObject = this.state.dataSourceSchedule.events;
      //console.log(ScheduleObject);
      var nextEventIndex;
      var EventNext = [];

    if (typeof ScheduleObject != 'undefined'){
      for (var i = 0; i < ScheduleObject.length; i++){
        //console.log("ScheduleObject");
        //console.log(ScheduleObject[i].start);
        // var eventDate = moment(ScheduleObject[i].start).format("D");
        // console.log(eventDate);
        // console.log(TodaysDate);
        // if(eventDate > TodaysDate){
        //   console.log("early");
        // } else if (eventDate == TodaysDate) {
        //   console.log("today");
        // } else {
        //   console.log("after");
        // }

        if(moment(ScheduleObject[i].start).isAfter(todaysDateISO)){
          nextEventIndex = i;
          //console.log("final index");
          //console.log(nextEventIndex);
          break;
        }
      }
    }
    if (typeof ScheduleObject != 'undefined'){
        EventNext = ScheduleObject[nextEventIndex];
        //console.log("NExt Event");
        //console.log(EventNext);
    }
    var nextevetTitle = "Loading";
    var nexteventTime = ""
    nextevetTitle = EventNext.title;
    nexteventTime = moment(EventNext.start).format("h A");

    var eventString = "Loading...";
    eventString = nextevetTitle +" at " + nexteventTime;
    //console.log(eventString);
    return eventString;
    }



  render() {
    var events = this.fetchNextEvent();
    //var events = this.state.dataSourceSchedule; //
    var update = this.state.dataSourceMessages;
    var timeAgo = moment(this.state.dataSourceMessagesTime).fromNow();
    //var startTime = moment(this.state.dataSourceScheduleTime).format("h A"); //
    // console.log(events);
    //console.log(this.state.dataSourceSchedule);
    // console.log(update);
    console.log(Device.width);

    if (this.state.isLoading) {
      if(Device.width === iphone4swidth){
        return this.renderLoadingViewiPhone4();
      }else {
        return this.renderLoadingViewiPhone6();
      }
    }else {
      if(Device.width === iphone4swidth){
        return this.renderLoadediPhone4(events , update , timeAgo);
      }else {
        return this.renderLoadediPhone6(events , update , timeAgo);
      }

    }

  }




  renderLoadediPhone6(events , update, timeAgo) {
      //this.fetchNextEvent();

      return (
        <View style={styles.container}>
          <Image source={require('image!MainLogo')}
          style={styles.logoImage}>
          </Image>




          <Text style={styles.dashHeaderiPhone6} >Latest Update</Text>
          <Text style={styles.updatesDashBoxiPhone6}>
            {update}
          </Text>



          <Text style={styles.timeiPhone6}>{timeAgo}</Text>

          <Text style={styles.dashHeaderiPhone6}>Next Event</Text>
          <Text style={styles.scheduleDashBoxiPhone6}>
          {events}
          </Text>
        </View>
      );
  }

  renderLoadingViewiPhone6() {
      return (
        <View style={styles.container}>
          <Image source={require('image!MainLogo')}
          style={styles.logoImage}>
          </Image>
          <Text style={styles.dashHeaderiPhone6} >Latest Update</Text>
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



  renderLoadediPhone4(events , update, timeAgo) {
    //this.fetchNextEvent();

      return (
        <View style={styles.container}>
          <Image source={require('image!MainLogo')}
          style={styles.logoImage}>
          </Image>



          <Text style={styles.dashHeaderiPhone4}>Latest Update</Text>
          <Text style={styles.updatesDashBoxiPhone4}>{update}</Text>
          <Text style={styles.timeiPhone4}>{timeAgo}</Text>

          <Text style={styles.dashHeaderiPhone4}>Next Event</Text>
          <Text style={styles.scheduleDashBoxiPhone4}>
          {events}
          </Text>
        </View>
      );
  }

  renderLoadingViewiPhone4() {
      return (
        <View style={styles.container}>
          <Image source={require('image!MainLogo')}
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
      color: '#A6A6A6',
      textAlign: 'left',
      width: 250,
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
      color: '#A6A6A6',
      width: 250,
  },
})

module.exports = Dash
