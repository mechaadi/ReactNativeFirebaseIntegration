/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';



export default class App extends Component {


  state={
    email:"",
    name:"",
    dp:"",
    isAuthenticated : false
  }
  async read (){
    console.log("hey there");

    try {
      // Add any configuration settings here:
      await GoogleSignin.configure({
        webClientId:"962773095151-n9sf9vvard5n9tv6l03kqj3b75mlk265.apps.googleusercontent.com"
      });
  
      const data = await GoogleSignin.signIn();
     // console.log(data);
      // create a new firebase credential with the token
       const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // // login with credential
       const currentUser = await firebase.auth().signInWithCredential(credential);
  
       console.log("HERE WE ARE", currentUser.user.photoURL);
      
    } catch (e) {
      console.error(e);
    }
  }

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  logout(){
    firebase.auth().signOut();
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      console.log("Authenticatedd");
      console.log(user.displayName);
      this.setState({
        isAuthenticated:true,
        name:user.displayName,
        email:user.email,
        dp:user.photoURL,
      })
    }


    else{
      this.setState({
        isAuthenticated:false,
        name:"",
        email:"",
        dp:"",
        
      })
      console.log("UnAuth");
    }
  });
}

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Hello, {this.state.name}</Text>
        <Button title="Login" onPress={this.read.bind(this)}/>
        <Button title="Logout" onPress={this.logout.bind(this)}/>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.dp}}
        />
      </View>
    );
  }
}