import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import {Header} from 'react-native-elements'

export default class App extends React.Component {
  render(){
    return (
    <View style={styles.container}>
    <Header centerComponent={{ text: 'BARTER APP', style: { color: '#fff',fontSize:25 } }}/>
      <WelcomeScreen />
    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
