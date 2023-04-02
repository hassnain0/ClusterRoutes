import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import firebase from "firebase/compat";
import Login from '../Screens/Login';
import { Picker } from "@react-native-picker/picker";
import { auth, db } from './Firbase';
 import { createUserWithEmailAndPassword } from '@firebase/auth';
import { horizontalScale, moderateScale, verticalScale } from './Dimension';
import { showError, showSucess } from './Helper/Helper';


const SignUPScreenCom=({navigation})=>{
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  //Here usestate is used to initialize variables
  const [password, setPassword] = useState('');
  
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [identity,setIdentity]=useState('')

  // const app=initializeApp(firebaseConfig);
  // const auth=getAuth(app);

  const handleSignUp = () => {
    if(!email&&!password&&!confirmPassword&&!username|!identity)
    {
      
      showError("Please enter required details and also pick your identity")
    }
    if(!identity=='Worker'||!identity=='Admin'){
      showError("Please enter your identity")
    }
    if(identity==''){
      showError("Please Select your Identity")
    }
    else{
      const regex = /^[A-Z]/;
      if (regex.test(email)) {
        showError('Email should start with a lowercase letter');
      
      }
      else{    
    if (password === confirmPassword) {
 createUserWithEmailAndPassword(auth,email,password)
 .then(userCredentials=>{
  addusernameFirebase(username)
  showSucess("Signed In Sucessfully")
    setEmail(''),
    setUsername(''),
    setPassword(''),
    setConfirmPassword(''),
    setPassword('')
  navigation.navigate(Login)
  
 })
 .catch(err => {
  if (err.code === 'auth/email-already-in-use') {
    showError('That email address is already in use!');

  }

  if(!email&&!password&!confirmPassword&!identity)
  {
    showError(err.code)
  }
  if (err.code === 'auth/invalid-email') {
showError(err.code);
  }

  if(!email||!password||!confirmPassword){
    showError(err.code)
  } 
  if (err.code === 'auth/email-already-in-use') {
    showError(err.code);
  }
});
    }

    else
    {
      showError("Password and confirm password not matched")
    }
  }
}
  };


  const handlePickerValueChange=(itemvalue)=>{
   setIdentity(itemvalue)

   console.log(identity)
        
      
  }
  const addusernameFirebase = async (username) => {
     
    if(identity=='Engineer'){    
    try {
      
    
  db.collection('Usernmaes')
        .doc(email)
        .set({
          email:email,
          Username:username,
          Value:identity,
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });

} catch(error){

}}
else
{
      
  db.collection('Admins')
        .doc(email)
        .set({
          email:email,
          Value:identity,
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
}  
  }

  return(
      

      <KeyboardAvoidingView    style={styles.Cardcontainer}>    
    
<Text style={{fontSize:50,fontWeight:'500',paddingRight:moderateScale(1)}}>Create new </Text>
<Text style={{fontSize:50,fontWeight:'500',}}>Account </Text>
<TouchableOpacity onPress={()=>navigation.navigate('Login')}>
     < Text style={{color:'black',fontSize:10 , padding:moderateScale(5), }}>  Already Registered ? Log in here</Text>
     </TouchableOpacity>
<Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(210),paddingTop:10}}>Name</Text>
     
      <TextInput placeholder='Enter your name' value={username} textAlign='center' auto onChangeText={text=>setUsername(text)} style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(210),paddingTop:10}}>Identity</Text>
      <Picker
        selectedValue={identity}
        onValueChange={handlePickerValueChange}
        style={{paddingRight:moderateScale(250),textShadowColor:'#ffff',backgroundColor:'#EBECF0',marginBottom:10}}
        
      >
       <Picker.Item label="Select your Identity" value=""/>
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Engineer" value="Engineer" />
       
      </Picker>
      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(210),paddingTop:5}}>EMAIL</Text>
      <TextInput placeholder='Enter email'  value={email} textAlign='center' auto onChangeText={text=>setEmail(text)} style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(180),paddingTop:5}}>PASSWORD</Text>
      <TextInput placeholder='Enter password'  value={password} textAlign='center' secureTextEntry={true} auto onChangeText={text=>setPassword(text)} style={styles.InputContainer} ></TextInput>

      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(190)}}>CONFIRM</Text>
      <TextInput placeholder='Enter confrim password'  value={confirmPassword} textAlign='center' secureTextEntry={true} auto onChangeText={text=>setConfirmPassword(text)} style={styles.InputContainer} ></TextInput>

     
      

    
<TouchableOpacity style={styles.TouchContainer} onPress={handleSignUp}>
    <Text style={{fontSize:20,alignItems:'center',color:'white',width:280,height:40,paddingTop:5}}>                       Sign up</Text>   
    </TouchableOpacity>
   
    
    </KeyboardAvoidingView>
    



  )
}
 
const styles = StyleSheet.create({
  Cardcontainer: {
    flex: 1,
    width:'110%',
    backgroundColor:'#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:50,
    borderTopRightRadius:20,
       borderTopLeftRadius:90,  
       borderRadius:10,
        marginTop:moderateScale(70),
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
  submitButtonText: {
    color: "black",
       
    fontSize: 15,
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
export default SignUPScreenCom;