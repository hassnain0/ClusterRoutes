import React, {useState} from "react";
import { View,Alert,Text,TextInput,Button,TouchableOpacity, StyleSheet,KeyboardAvoidingView,Image} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { horizontalScale,verticalScale,moderateScale } from "../Tracker/Screens/Dimension";
import { firebaseConfig } from "./Screens/Firbase";
// import { initializeApp } from "@firebase/app";
// import {getAuth} from '@firebase/auth'
import ForgotScreen from "./Screens/ForgotScreen";
import Home from "./Screens/Home";
import SignUp from "./Screens/SignUp";
import Map from "./Screens/Map";
import AnotherFile from "./Screens/AnotherFile";
import FirestoreData from "./Screens/FirestoreData";
import { auth } from "./Screens/Firbase";
import { signInWithEmailAndPassword } from "@firebase/auth";
const Card=({navigation})=>{


  const [pickerValue,setPickerValue] =useState('')
  const [myEmail,setEmail] =useState('');
  const [myPassword,setPassword] =useState('');
  const [message,setMessage] =useState('');

  // const app=initializeApp(firebaseConfig);
  // const auth=getAuth(app);
  
  const handleLogin=()=>{

 signInWithEmailAndPassword(auth,myEmail, myPassword).then(() => {

    navigation.navigate(Home)
  })
  .catch(error=>{
    if(error.code=='auth/too-many-request'){
      Alert.alert('Too many wrong attempts ! Account Disabled please reset your password')
    }
    if(error.code=='auth/wrong-password'){
      Alert.alert('Wrong Password')
    }
    
    })
  }
   

  return(
      

      
    <KeyboardAvoidingView>
    <View style={styles.Cardcontainer} >
      <View style={styles.NestedHeader}>
     <Image source={require('./assets/Header.png')} style={styles.ImageContainer}></Image>
     < Text style={{color:'#EDEDED', fontWeight:'bold',fontSize:25 , padding:moderateScale(5), }}>     Cluster Routes</Text></ View>
     <Picker
        selectedValue={pickerValue}
        onValueChange={(itemValue) => setPickerValue(itemValue)}
        style={{paddingRight:270,textShadowColor:'#ffff',backfaceVisibility:false}}
        
      >
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Worker" value="worker" />
       
      </Picker>
      <TextInput placeholder='            Enter email'  value={myEmail} auto onChangeText={text=>setEmail(text)} style={styles.InputContainer} ></TextInput>
     
<TextInput placeholder='            Enter password'  secureTextEntry={true}  value={myPassword} onChangeText={text=>setPassword(text)} style={styles.InputContainer}></TextInput>
<TouchableOpacity  style={styles.submitButton}onPress={handleLogin}>
   <Text style={styles.submitButtonText}>Login</Text>
   </TouchableOpacity>
   <TouchableOpacity  style={styles.submitButton} onPress={()=>navigation.navigate(SignUp)}>
   <Text style={styles.submitButtonText}>SignUP</Text>
   </TouchableOpacity>
 
   <TouchableOpacity onPress={()=>navigation.navigate(ForgotScreen)}>
   <Text style={styles.TextContainer}>                          Forgot Pasword ?</Text>
   
   </TouchableOpacity>

 

    </View>
    <Text>{message}</Text>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  Cardcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:1,
    borderRadius:20,
   
    color:'#5388CE',    
    
   
    paddingTop:80,
  
   

  
  },
  Container:
{
  paddingBottom:100,
},
  
  
  ImageContainer:{

    paddingHorizontal:horizontalScale(120),
    width:200,
    height:200,
    
  },
  InputContainer:{
    marginTop:15,
    marginBottom:10,
  
    margin:5,
    borderWidth:0.5,
    borderRadius:5,
   width:'90%',
   height:40,
    
    
 
    

  },
  NestedHeader:{
  
  },
  submitButton: {


    color:'black',
    padding:moderateScale(5),
    alignItems: "center",
    margin:1,
    },
    submitButtonText: {
    color: "black",
    fontWeight: "100",
    fontSize: 15,
    },

  TextContainer:{
    margin:10,
    color:'#EDEDED',
    fontWeight:'normal',
    fontSize:15,
    
  }

})
export default Card;