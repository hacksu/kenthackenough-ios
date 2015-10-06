'use strict';

var React = require('react-native');
var moment = require('moment');

// production
var MESSEGES_URL = 'https://api.khe.io/v1.0/messages';
// local
//var MESSEGES_URL = 'http://localhost:3000/db'

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
        //backgroundColor: '#141414',
        padding: 20
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    time: {
        fontSize: 15,
        marginBottom: 8,
        marginTop: 10,
        color: '#999999'
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: 'white'
    },
    separator: {
        height: 1,
        backgroundColor: '#333333'
    },
    listView: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#231F20'
    },
    background: {
      backgroundColor: '#231F20',
      flex: 1,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class UpdateList extends Component {

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

        fetch(MESSEGES_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.messages),
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
                renderRow={this.renderMessage.bind(this)}
                style={styles.listView}
                />
          </View>
        );
    }

    renderMessage(messages) {
        let timeAgo = moment(messages.created).fromNow();

        return (

                <View>
                    <View style={styles.separator} />
                    <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{messages.text}</Text>
                            <Text style={styles.time}>{timeAgo}</Text>
                        </View>
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
                    Loading updates...
                </Text>
            </View>
        );
    }

}

module.exports = UpdateList
