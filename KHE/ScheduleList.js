/**
 * Created by echessa on 4/24/15.
 */

'use strict';

var React = require('react-native');
var SCHEDULE_URL = 'https://api.khe.io/v1.0/events';
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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#231F20',
        padding: 10,
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'red'
    },
    title: {
        fontSize: 13,
        marginBottom: 8,
        color: 'white'
    },
    separator: {
        height: 1,
        backgroundColor: '#231F20'
    },
    listView: {
        flex: 1,
        backgroundColor: '#231F20',
        marginTop: 20
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
      backgroundColor: '#231F20',
      flex: 1,
    }
});

class ScheduleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    }


    componentDidMount() {
        this.fetchData();
    }

    fetchData() {

        fetch(SCHEDULE_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.events),
                    isLoading: false
                });
            })
            .done();
    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
          <View style={styles.background}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderEvent.bind(this)}
                style={styles.listView}
                />
          </View>
        );
    }

    renderEvent(events) {
        var startTime = moment(events.start).format('lll');
        var endTime = moment(events.end).format('lll');

        return (
                <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <Text style={styles.header}>{events.title}</Text>
                            <Text style={styles.title}>{events.location}</Text>
                            <Text style={styles.title}>{startTime}</Text>
                            <Text style={styles.title}>{endTime}</Text>
                            <Text style={styles.title}>{events.description}</Text>
                        </View>
                    <View style={styles.separator} />
                </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <ActivityIndicatorIOS
                    size='large'/>
                <Text>
                    Loading events...
                </Text>
            </View>
        );
    }
}

module.exports = ScheduleList;
