'use strict';

var React = require('react-native');
var Markdown = require('react-native-markdown');
var moment = require('moment');

// production
//var MESSEGES_URL = 'https://api.khe.io/v1.0/messages';
// local
var MESSEGES_URL = 'http://localhost:3000/db'

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
        backgroundColor: '#222222',
        padding: 20
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: 'white'
    },
    time: {
        fontSize: 13,
        marginBottom: 8,
        marginTop: 8,
        color: '#A6A6A6'
    },
    separator: {
        height: 1,
        backgroundColor: '#333333',
    },
    listView: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#222222'
    },
    background: {
      backgroundColor: '#222222',
      flex: 1,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222222',
    },
});

var mdStyles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 16,
    }
});

class UpdateList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            forceUpdate: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillReceiveProps(props) {

      console.log('componentWillReceiveProps UpdateList');
      this.fetchData();
    }

    fetchData() {
      console.log('fetch Update');
        fetch(MESSEGES_URL)
            .then((response) => response.json())
            .then((responseData) => {
                var _ds = JSON.parse(JSON.stringify(responseData));
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(_ds.messages),
                    isLoading: false
                });
                console.log(_ds);
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
        var timeAgo = moment(messages.created).fromNow();
        return (

                <View>
                    <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <Markdown style={mdStyles}>
                                {messages.text}
                            </Markdown>
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
