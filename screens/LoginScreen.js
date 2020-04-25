import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import  * as  Icon   from 'react-native-vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default class LinksScreen extends React.Component {
  state = {
    email: '',
    password: ''
  };
  sendCred = () => {
    fetch('http://80ee92e2.ngrok.io/signin',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "email":this.state.email,
        "password":this.state.password,
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
  }
  render(){
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.Head}>Login</Text>
        <TextInput
          mode='outlined'
          label='Email'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.TextInput}
        />
        <TextInput
          mode='outlined'
          label='Password'
          value={this.state.password}
          secureTextEntry = {true}
          onChangeText={password => this.setState({ password })}
          style={styles.TextInput}
        />
        <Button icon="login" mode="contained" onPress={this.sendCred} style={styles.ButtonInput}>
          Login
        </Button>
      </ScrollView>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    padding: 15,
  },
  ButtonInput: {
    marginTop: 15,
    marginBottom: 15,
  },
  TextInput: {
    marginTop: 15,
    marginBottom: 15,
  },
  Head: {
    textAlign:'center',
    fontSize: 50,
    fontWeight: '600',
    color: '#e0e0e0',
  }
});
