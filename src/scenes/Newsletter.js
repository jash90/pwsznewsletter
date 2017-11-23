import React, { Component } from 'react';
import { View, StyleSheet, TextInput, WebView, Alert, FlatList, ListView, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback, Image, ScrollView } from 'react-native'
import JSSoup from 'jssoup';
import { Button, List, ListItem, Text, Header, Avatar } from 'react-native-elements';
import { Drawer } from 'native-base';
import SideBar from '../components/SideBar';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class NewsletterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
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
                    backgroundColor={'red'} />
                <Drawer
                    ref={(ref) => { this.drawer = ref; }}
                    content={<SideBar />}
                    onOpen={() => this.openDrawer()}
                    onClose={() => this.closeDrawer()} >
                </Drawer>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ width: '50%' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        style={{ padding: 15, width: 200, height: 150 }}
                                        source={{ uri: this.props.imgUri }}
                                    /></View>
                            </View>
                            <View style={{ width: '50%', justifyContent: 'center', padding: 15 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                        {this.props.title}
                                    </Text>
                                </View>
                                <Text style={{ textAlign: 'center' }}>
                                    {this.props.date}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <WebView
                        source={{ html: this.props.content }}
                        style={{ marginTop: 20, flex: 1 }}
                    />
                </ScrollView>
            </View>
        );
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

}

const styles = StyleSheet.create({
});
export default NewsletterList;