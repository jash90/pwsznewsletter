import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    WebView,
    Alert,
    FlatList,
    ListView,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    ScrollView
} from 'react-native'
import JSSoup from 'jssoup';
import {
    Button,
    List,
    ListItem,
    Text,
    Header,
    Avatar
} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Drawer} from 'native-base';
import SideBar from '../components/SideBar';
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});
class NewsletterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:{}
        };
    }
    componentDidMount() {
        fetch(this.props.site).then((responseJson) => {
            var site = new JSSoup(responseJson._bodyInit);

       alert(site.find('div', 'kontener').find('div', 'aktualnosci'));
    
        }).catch((error) => {
            console.error(error);
        });
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <Header
                    leftComponent={{
                    icon: 'menu',
                    color: '#fff'
                }}
                    centerComponent={{
                    text: 'PWSZNewsletter',
                    style: {
                        color: '#fff'
                    }
                }}
                    backgroundColor={'red'}/>
                <Drawer
                    ref={(ref) => {
                    this.drawer = ref;
                }}
                    content={< SideBar />}
                    onOpen={() => this.openDrawer()}
                    onClose={() => this.closeDrawer()}>
                    <Grid>
                        <Row size={2}>
                            <Col>
                                <Image
                                    style={{
                                        flex:1
                                }}
                                    source={{
                                    uri: this.props.imgUri
                                }}/></Col>
                            <Col>
                                <View
                                    style={{
                                    flexDirection: 'column'
                                }}>
                                    <Text
                                        style={{
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                        {this.props.title}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                    textAlign: 'center'
                                }}>
                                    {this.props.date}
                                </Text>
                            </Col>
                        </Row>
                        <Row size={8}>
                            <ScrollView
                                contentContainerStyle={{
                                flex: 1
                            }}>
                                {/* <WebView
                                    source={{
                                   html: this.state.content
                                }}
                                    style={{
                                    marginTop: 20,
                                    flex: 1
                                }}/> */}
                            </ScrollView>
                        </Row>
                    </Grid>
                </Drawer>
            </View>
        );
    }
    closeDrawer = () => {
        this
            .drawer
            ._root
            .close()
    };
    openDrawer = () => {
        this
            .drawer
            ._root
            .open()
    };

}

const styles = StyleSheet.create({});
export default NewsletterList;