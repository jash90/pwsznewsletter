import React, { Component } from 'react';
import { View, StyleSheet, TextInput, WebView, Alert, FlatList, ListView, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import JSSoup from 'jssoup';
import { Button, List, ListItem, Text, Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class NewsletterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      aktualnosci: [],
      pager: [],
      page: 2,
    };
  }
  componentDidMount() {
    fetch('http://www.pwsz.krosno.pl/uczelnia/aktualnosci/').then((responseJson) => {
      var site = new JSSoup(responseJson._bodyInit);
      this.setState({
        aktualnosci: this.state.aktualnosci.concat(site.findAll('div', 'aktualnosci-margines'))
      });
      this.setState({
        pager: site.findAll('div', 'pager')
      });
      //alert(this.state.aktualnosci[0]);
      this.setState({ dataSource: ds.cloneWithRows(this.state.aktualnosci) });
    }).catch((error) => {
      console.error(error);
    });

    // fetch('http://www.pwsz.krosno.pl/uczelnia/aktualnosci/page,2.html').then((responseJson) => {
    //   var site = new JSSoup(responseJson._bodyInit);
    //   this.setState({
    //     aktualnosci: this.state.aktualnosci.concat(site.findAll('div', 'aktualnosci-margines'))
    //   });
    //   this.setState({dataSource: ds.cloneWithRows(this.state.aktualnosci)});
    // }).catch((error) => {
    //   console.error(error);
    // });
  }
  render() {
    return (
      <View>
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item) =>
            <TouchableNativeFeedback onPress={() => this.onClickNewsletter(item)}>
              <ListItem
                roundAvatar
                avatar={{
                  uri: 'http://www.pwsz.krosno.pl' + item
                    .find('img')
                    .attrs
                    .src
                }}
                subtitle={item.find('div', 'data').text + '\n' + item.text.substring(item.text.lastIndexOf('\n')).trim()}
                title={item
                  .find('h3')
                  .text} />
            </TouchableNativeFeedback>}
          renderFooter={() => { return <ActivityIndicator /> }}
          onEndReached={() => this.onEndReached()}

        />
      </View>
    );
  }
  onEndReached() {
    this.setState({ page: this.state.page + 1 });
    fetch('http://www.pwsz.krosno.pl/uczelnia/aktualnosci/page,' + this.state.page + '.html').then((responseJson) => {
      var site = new JSSoup(responseJson._bodyInit);
      this.setState({
        aktualnosci: this.state.aktualnosci.concat(site.findAll('div', 'aktualnosci-margines'))
      });
      this.setState({ dataSource: ds.cloneWithRows(this.state.aktualnosci) });
    }).catch((error) => {
      console.error(error);
    });
  }
  onClickNewsletter(item) {
    Actions.Newsletter({
      title: item.find('h3').text,
      date: item.find('div', 'data').text,
      content: item.prettify(),
      imgUri: 'http://www.pwsz.krosno.pl' + item.find('img').attrs.src
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
export default NewsletterList;