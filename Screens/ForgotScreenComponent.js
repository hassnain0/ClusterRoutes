import React, { useState, useSyncExternalStore } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import firebase from "firebase/compat";
import Login from '../Screens/Login';
import { auth, db } from './Firbase';
 import { sendPasswordResetEmail } from '@firebase/auth';
import { horizontalScale, moderateScale, verticalScale } from './Dimension';
import { showError, showSucess } from './Helper/Helper';


const ForgotScreenComponent=()=>{

  const [email,setEmail]=useState([]);

  const handleSubmit = () => {
  sendPasswordResetEmail(auth,email)
     .then(() => {
       setEmail('');
      showSucess("Password reset email sent successfully!");
 
      navigation.navigate(Login)
       
     
     })
     .catch((error) => {
      if(error.code=='auth/invalid-email')
      showError('Invalid Email Entered')
     });
   
     
   }
   if(!email){
     
   } 
  
  return (
    <View style={styles.Cardcontainer}>
     
     <Text style={{fontSize:30,fontWeight:'500',paddingRight:moderateScale(1),paddingBottom:moderateScale(80)}}>Forgot Password</Text>
     <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(190)}}>CONFIRM</Text>

      <TextInput placeholder='            Enter your email'  value={email} auto onChangeText={text=>setEmail(text)} style={styles.InputContainer} >

      </TextInput>

      
      <TouchableOpacity style={styles.TouchContainer} onPress={handleSubmit}>
    <Text style={{fontSize:20,alignItems:'center',color:'white',width:280,height:40,paddingTop:5}}>                  Send Email</Text>   
    </TouchableOpacity>
   




     
    </View>
  );
};


  const styles = StyleSheet.create({
    Cardcontainer: {
      flex: 1,
      width:'110%',
      backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:50,
         borderTopRightRadius:160,
         borderTopLeftRadius:5,  
         borderRadius:5,
          marginTop:moderateScale(90),
        borderColor:'#007ACC',
        color:'#5388CE',    
         padding:moderateScale(50),
        shadowOpacity:1,
        shadowColor:'#4C5053',
        
        paddingBottom:moderateScale(100),
        alignItems:'center',
        paddingLeft:verticalScale(48),
        paddingRight:verticalScale(110),
    },
    Container:
  {
    paddingBottom:100,
  },
    
    
    InputContainer:{
      marginTop:1,
      marginBottom:10,
      backgroundColor:'#EBECF0',
      margin:5,
      borderRadius:20,
    
     width:'100%',
     height:50,
      
  
      
   
      
  
    },
    
    submitButton: {
  
  
      color:'black',
      padding:moderateScale(5),
      alignItems: "center",
      margin:1,
      },
      submitButtonText: {
      color: "black",
         
      fontSize: 15,
      },
      TouchContainer:{
        backgroundColor:'#012F46',
       borderRadius:5,
        marginTop:16,
        borderColor:'white',
      }
  ,
    TextContainer:{
      margin:10,
      color:'black',
      fontWeight:'normal',
      fontSize:15,
      
    }
  
  })
 
export default ForgotScreenComponent;