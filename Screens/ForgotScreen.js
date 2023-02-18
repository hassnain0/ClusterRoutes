import React, { useState } from 'react';
import { View, Text, TextInput, Alert,TouchableOpacity, StyleSheet,Image, ScrollView } from 'react-native';
import { firebaseConfig } from '../Screens/Firbase';
import { sendPasswordResetEmail} from '@firebase/auth';
import { auth } from '../Screens/Firbase';
import { moderateScale } from './Dimension';
import Login from './Login';

const ForgotScreen= ({navigation}) => {
  const [email, setEmail] = useState('');
 
//Here usestate is used to initialize variables
  const [message,setMessage] = useState('');

  

  const handleSubmit = () => {
   sendPasswordResetEmail(auth,email)
      .then(() => {
        Alert.alert("Password reset email sent successfully!");
        navigation.navigate(Login)
        
      
      })
      .catch((error) => {
       if(error.code=='auth/invalid-email')
       setMessage('Invalid Email Entered')
      });
    
      
    }
    if(!email){
      
    } 
   
  

  return (
    <View style={styles.container}>
     
     
         <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      
  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
    <Text style={styles.submitButtonText}>Reset Password</Text>
  </TouchableOpacity>
  <Text style={{fontSize:20, justifyContent:'center', alignItems:'center', color:'red'}}>{message}</Text>



     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    padding:moderateScale(20),
    
  },
  Cardcontainer:{

paddingBottom:50,
paddingRight:20,
width:400,


    
    
  },
  label: {
    fontWeight: 'bold',
    margin:10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
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
  buttonText: {
    color: 'blue',
    
    fontSize:20,
  },
  LottieContainer:{
      paddingLeft:60,
      width:200,
      height:200,
      margin:10,
    
  }
});

export  default ForgotScreen;
