import React, {useState} from "react";
import { View,Alert,Text,TextInput,Button,TouchableOpacity, StyleSheet,KeyboardAvoidingView,Image} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { horizontalScale,verticalScale,moderateScale } from "../ClusterRoutes/Screens/Dimension";
import { db, firebaseConfig ,auth} from "./Screens/Firbase";
// import { initializeApp } from "@firebase/app";
// import {getAuth} from '@firebase/auth'
import ForgotScreen from './Screens/ForgotSceen'
import { Keyboard } from 'react-native';
import Home from "./Screens/Home";
import SignUp from "./Screens/SignUp";

import { signInWithEmailAndPassword } from "@firebase/auth";
import AdminHomeScreen from "./Screens/AdminHomeScreen";
import TempMap from "./Screens/TempMap";

import firebase from "firebase/compat";
import { showError, showSucess } from "./Screens/Helper/Helper";
import { useFocusEffect } from "@react-navigation/native";
const Card=({navigation})=>{

  const [keyboardShown, setKeyboardShown] = useState(false);
 const [myEmail,setEmail] =useState('');
  const [myPassword,setPassword] =useState('');
  
  const [selectedValue, setSelectedValue] = useState();
  // const app=initializeApp(firebaseConfig);

  
   //Method to move to admin or user home screen
  const handlePickerValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  const handleLogin = async () => {
   
  if (!myEmail || !myPassword) {
    showError("Please enter email and password");
  } else if (!selectedValue) {
    showError("Please select your identity");
  } else {
   
      const doc = await db.collection("Usernmaes").doc(myEmail).get();
      if (doc.exists) {
        console.log("Hello")
        const data = doc.data();

        const Data=data.Value;

        console.log("Data Value",Data)
        if (Data===selectedValue) { 
          await signInWithEmailAndPassword(auth, myEmail, myPassword).catch(error=>{
            showError(error)
           
          })
          navigation.navigate(Home);

         
        }
        else

        {showError("Please select your identity")}
      
        
         
          
        }
        else if(selectedValue=='Admin')
        { await signInWithEmailAndPassword(auth, myEmail, myPassword).catch(error=>{
          showError(error)
         
        
           
      } );
      navigation.navigate(AdminHomeScreen);
  

    }
    else
    {
      showError("Please pick your identity")
    }
       
      }

     
}


  

  

  return(
      

      
    
    <KeyboardAvoidingView style={styles.Cardcontainer} >
      <View style={styles.NestedHeader}>
     <Text style={{fontSize:50,fontWeight:'600',paddingRight:moderateScale(1),marginTop:moderateScale(10)}}>Login</Text>
     < Text style={{color:'black', color:'#B5B5B5',fontSize:15 , padding:moderateScale(5), }}>  Cluster Routes</Text></ View>
     < Text style={{fontSize:15,color:'black',paddingRight:moderateScale(150),}}>Log  in as {selectedValue}</Text>
     <Picker
        selectedValue={selectedValue}
        onValueChange={handlePickerValueChange}
        style={{paddingRight:moderateScale(250),textShadowColor:'#ffff',backgroundColor:'#EBECF0',marginBottom:5,borderRadius:10}}
        
      >
           <Picker.Item label="Select your Identity" value=""/>
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Engineer" value="Engineer" />

      </Picker>
      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(200),paddingTop:10}}>EMAIL</Text>
      <TextInput placeholder='Enter email'  value={myEmail} textAlign='center' auto onChangeText={text=>setEmail(text)} style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(180) }}>PASSWORD</Text>
      <TextInput placeholder='Enter password'  secureTextEntry={true}  value={myPassword} onChangeText={text=>setPassword(text)} textAlign='center' style={styles.InputContainer}></TextInput>
       <View style={styles.BottomCard}>
    
   
</View>
<TouchableOpacity style={styles.TouchContainer} onPress={handleLogin}>
    <Text style={{fontSize:20,alignItems:'center',color:'white',width:280,height:40,paddingTop:5}}>                       Log in</Text>   
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate(ForgotScreen)}>
   <Text style={{color:'#BCBCBC',fontSize:20,paddingTop:10}}>Forgot   Pasword?</Text>
   
   </TouchableOpacity>
   <TouchableOpacity  style={styles.submitButton} onPress={()=>navigation.navigate(SignUp)}>
   <Text  style={{color:'#BCBCBC',fontSize:15}}>Signup!</Text>
   </TouchableOpacity>
    </KeyboardAvoidingView>
    
    

  )
}

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
      paddingTop:moderateScale(90),
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
    fontSize:15,
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
export default Card;