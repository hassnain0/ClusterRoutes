import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ScrollView, Alert } from 'react-native';

// import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@firebase/auth';
// import { firebaseConfig } from '../Screens/Firbase';
// import { initializeApp } from '@firebase/app';
import Login from '../Screens/Login';
import { auth } from './Firbase';
 import { createUserWithEmailAndPassword } from '@firebase/auth';

const SignUp= ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  //Here usestate is used to initialize variables
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 

  // const app=initializeApp(firebaseConfig);
  // const auth=getAuth(app);

  const handleSignUp = () => {
    if (password === confirmPassword) {
 createUserWithEmailAndPassword(auth,email,password)
 .then(userCredentials=>{
  Alert.alert(email,"Registered Sucessfully")
  navigation.navigate(Login)
  
 })
 .catch(err => {
  if (err.code === 'auth/email-already-in-use') {
    setMessage('That email address is already in use!');

  }

  if(!email&&!password&!confirmPassword)
  {
    setMessage(err.code)
  }
  if (err.code === 'auth/invalid-email') {
setMessage(err.code);
  }

  if(!email||!password||!confirmPassword){
   setMessage(err.code)
  } 
  if (err.code === 'auth/email-already-in-use') {
    setMessage(err.code);
  }
});
    }
    
    
  };

  const handleSubmit=()=>{

  }
  return (
    <View style={styles.container}>

<Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
         <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      
     <Text style={{fontWeight:'bold', fontSize:20, color:'red',paddingLeft:30, margin:10}}>{message}</Text>

     
     <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
    <Text style={styles.submitButtonText}>Sign UP</Text>
  </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    
  },
  Cardcontainer:{


width:400,
paddingRight:100,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  button: {
   
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'blue',
    
    fontSize:20,
  },
    
submitButton: {
    backgroundColor: "#0D2B34",
    padding:10,
    paddingLeft:10,
    paddingRight:10,
    margin:20,
    alignItems: "center",
    },
    submitButtonText: {
    color: "#fff",
    fontWeight: "60",
    fontSize: 16,
    },
});

export  default SignUp;
