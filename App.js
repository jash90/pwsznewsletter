import React, {Component} from 'react';
import {View, StyleSheet, TextInput, WebView, Alert} from 'react-native'
import JSSoup from 'jssoup';
import {Button, List, ListItem, Text, Header} from 'react-native-elements';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aktualnosci: [],
      pager:[],
    }
  }
  componentDidMount() {
    fetch('http://www.pwsz.krosno.pl/uczelnia/aktualnosci/').then((responseJson) => {
      var site = new JSSoup(responseJson._bodyInit);
      this.setState({
        aktualnosci: site.findAll('div', 'aktualnosci-margines')
      });
      this.setState({
        pager:site.findAll('div','pager')
      });
      //alert(this.state.pager.find('a').text);
      // for (var i = 0; i < this.state.aktualnosci.length; i++) {
      //   alert(this.state.aktualnosci[i].find('div', 'data').text);
      // }
    }).catch((error) => {
      console.error(error);
    });
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
        backgroundColor={'red'}
        />
        <List>
          {this
            .state
            .aktualnosci
            .map((item, i) => (<ListItem
              roundAvatar
              avatar={{
              uri: 'http://www.pwsz.krosno.pl' + item
                .find('img')
                .attrs
                .src
            }}
              subtitle={item
              .find('div', 'data')
              .text}
              key={i}
              title={item
              .find('h3')
              .text}/>))
}
        </List>
      </View>
    );
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
export default App;