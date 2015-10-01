'use strict';

var React = require('react-native');


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
                    isLoading: false
                });
            })
            .done();
          fetch(SCHEDULE_URL)
              .then((response) => response.json())
              .then((responseData) => {
                  this.setState({
                      dataSourceSchedule: responseData.events[0].title,
                      isLoading: false
                  });
              })
              .done();
    }

  render() {
    var events = this.state.dataSourceSchedule;
    var update = this.state.dataSourceMessages;
    // console.log(events);
    // console.log(update);

    if (this.state.isLoading) {
        return this.renderLoadingView();
    }else {
        return this.renderLoaded(events , update);
    }

  }

  renderLoaded(events , update) {
      return (
        <View style={styles.container}>
          <Image source={require('./testImage/shortLogo.png')}
          style={styles.logoImage}>
          </Image>



          <Text style={styles.dashHeader}>Latest Update!</Text>
          <Text style={styles.updatesDashBox}>
          {update}
          </Text>

          <Text style={styles.dashHeader}>Next Event!</Text>
          <Text style={styles.scheduleDashBox}>
          {events}
          </Text>
        </View>
      );
  }

  renderLoadingView() {
      return (
        <View style={styles.container}>
          <Image source={require('./testImage/shortLogo.png')}
          style={styles.logoImage}>
          </Image>



          <Text style={styles.dashHeader}>Latest Update!</Text>

          <View style={styles.loading}>
              <ActivityIndicatorIOS
                  size='large'/>
              <Text>
                  Loading Updates...
              </Text>
          </View>


          <Text style={styles.dashHeader}>Next Event!</Text>

          <View style={styles.loading}>
              <ActivityIndicatorIOS
                  size='large'/>
              <Text>
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
  updatesDashBox: {
    flex: 1,
    fontSize: 13,
    backgroundColor: '#231F20',
    height: 100,
    width: 250,
    textAlign: 'left',
    color: 'white',
    position: 'relative',
  },
  scheduleDashBox: {
    flex: 1,
    fontSize: 13,
    backgroundColor: '#231F20',
    height: 100,
    width: 250,
    marginBottom: 80,
    textAlign: 'left',
    color: 'white',
    position: 'relative',
  },
  dashHeader: {
    marginTop: 40,
    fontSize: 13,
    backgroundColor: 'black',
    width: 250,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#231F20',
    paddingVertical: 20,
  },
  logoImage: {
    flex: 1,
    width: 250,
    height: 100,
    marginTop: 40,
    resizeMode: Image.resizeMode.contain,
    position: 'relative',
  },
  loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})

module.exports = Dash
