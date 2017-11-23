import React, { Component } from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import NewsletterList from './src/scenes/NewsletterList';
import Newsletter from './src/scenes/Newsletter';

class App extends Component{
render(){
return(
  <Router  backAndroidHandler={() => {
        Actions.pop();
        return true;
    }
}>
    <Stack key="root">
      <Scene key="NewsletterList" component={NewsletterList} hideNavBar={true}/>
      <Scene key="Newsletter" component={Newsletter} hideNavBar={true}/>
    </Stack>
  </Router>
);
}
}
export default App;