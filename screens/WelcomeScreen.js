import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import firebase from 'firebase'
import db from '../config';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName:'',
      lastName:'',
      mobileNumber:'',
      address:'',
      confirmPassword:'',
      isVisible:false
    };
  }
  userLogin = (username,password)=>{
    firebase.auth().signInWithEmailAndPassword(username,password)
    .then(()=>{
      return Alert.alert("Successfully Logged In")
    })
    .catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage);
    })
  }

  userSignUp = (username, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((response)=>{
        db.collection('users').add({
          firstName:this.state.firstName,
        lastName:this.state.lastName,
        mobileNumber:this.state.mobileNumber,
        address:this.state.address,
        username:this.state.username,
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
             ]
         );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }

  }

  showModal = ()=>(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text
            style={{justifyContent:'center', alignSelf:'center', fontSize:30,color:'#ff5722',margin:50}}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={12}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={12}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Mobile Number"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                mobileNumber: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Username"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.username, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>

      <View style={{justifyContent:'center',alignItems:'center'}}>
          {
            this.showModal()
          }
        </View>
        <KeyboardAvoidingView>
        
        <Text style={styles.heading}>Welcome</Text>
        <Image source={require('../assets/image.jpg')} style={{width:150,height:150}}/>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                username: text,
              });
            }}
          />
          <TextInput
            style={styles.input}
            maxLength={20}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
              >
              <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.setState({"isVisible":true})
              }}
              >
                <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
         
        </KeyboardAvoidingView>
      </View>
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 25,
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 5,
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#fffdd0",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:40,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ffff",
    marginTop:20,
    borderWidth:1,
  },
});
