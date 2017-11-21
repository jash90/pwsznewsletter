import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  WebView,
} from 'react-native'


var DomParser = require('react-native-html-parser').DOMParser


class App extends Component {
  componentDidMount() {
    let html = `<html>
                    <body>
                        <div id="b">
                            <a href="example.org">
                            <div class="inA">
                                <br>bbbb</br>
                            </div>
                        </div>
                        <div class="bb">
                            Test
                        </div>
                    </body>
                </html>`
    let doc = new DomParser().parseFromString(html, 'text/html')

    console.log(doc.querySelect('#b .inA'))
    console.log(doc.getElementsByTagName('a'))
    console.log(doc.querySelect('#b a[href="example.org"]'))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {"jdfghkdf"}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default App;