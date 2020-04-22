import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import  {AntDesign}  from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
export default class SignUpScreen extends React.Component {
  state = {
    email: '',
    password: '',
    cpass: '',
    gender: '',
  };
  render(){
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.Head}>Signup</Text>
            <TextInput
              mode='outlined'
              label='Name'
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              style={styles.TextInput}
            />
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
            <TextInput
              mode='outlined'
              label='Confirm Password'
              value={this.state.cpass}
              secureTextEntry = {true}
              onChangeText={cpass => this.setState({ cpass })}
              style={styles.TextInput}
            />
            <RadioButton.Group
              onValueChange={gender => this.setState({ gender })}
              value={this.state.gender}
            >
              <View><Text>Gender</Text></View>
              <View style={styles.RadioButtonDiv}>
                <View style={styles.RadioButtonWrapper}>
                  <Text style={styles.RadioButtonTitle}>Male</Text>
                  <RadioButton style={styles.RadioButton} value="male" />
                </View>
                <View style={styles.RadioButtonWrapper}>
                  <Text style={styles.RadioButtonTitle}>Female</Text>
                  <RadioButton  style={styles.RadioButton} value="female" />
                </View>
              </View>
            </RadioButton.Group>
            {this.state.cpass == this.state.password && (this.state.cpass != '' || this.state.password != '')  ? 
            <Button icon="account" mode="contained" onPress={() => console.log(this.state.email+" "+this.state.password+" "+this.state.gender+" "+this.state.name)} style={styles.ButtonInput}>
              Sign Up
            </Button>: null }
          </View>
        </ScrollView>
      </View>
    );
  };
}

SignUpScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
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
    marginBottom: 7.5,
  },
  Head: {
    textAlign:'center',
    fontSize: 50,
    fontWeight: '600',
    color: '#e0e0e0',
  },
  RadioButtonDiv: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position:'relative',
  },
  RadioButtonWrapper: {
    width: '50%',
  },
  RadioButtonTitle: {
    position:'absolute',
    left: '17%',
    top: '23%',
  }
});
