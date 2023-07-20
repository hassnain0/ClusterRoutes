import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import firebase from "firebase/compat";
import Login from '../Screens/Login';
import { Picker } from "@react-native-picker/picker";
import { auth, db } from './Firbase';
 import { createUserWithEmailAndPassword } from '@firebase/auth';
import { horizontalScale, moderateScale, verticalScale } from './Dimension';
import { showError, showSucess } from './Helper/Helper';

import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';


const SignUPScreenCom=({navigation})=>{
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  //Here usestate is used to initialize variables
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
   
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
   
      
    return () => {
      unsubscribe();
    };
  }, []);
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [identity,setIdentity]=useState('')

  // const app=initializeApp(firebaseConfig);
  // const auth=getAuth(app);

  const handleSignUp = () => {
   
      if (!isConnected) {
        showError("Please connect your internet connection")
        return ;
      }
    

    if(!email&&!password&&!confirmPassword&&!username|!identity)
    {
      
      showError("Please enter required details ")
    }
   
      else{    
    if (password === confirmPassword) {
 
      createUserWithEmailAndPassword(auth,email,password)
 .then(userCredentials=>{
  addusernameFirebase(username)
  showSucess("Please Wait untill administrator allow you ")
  
  setEmail(''),
    setUsername(''),
    setPassword(''),
    setConfirmPassword(''),
    setPassword('')
    navigation.navigate('Login')
  
  
 })
 .catch(err => {
  if (err.code === 'auth/email-already-in-use') {
    showError('That email address is already in use!');

  }

  if(!email&&!password&!confirmPassword&!identity)
  {
    showError("Please enter required details")
  }
  if (err.code === 'auth/invalid-email') {
showError("Invalid email");
  }

  if(!email||!password||!confirmPassword){
    showError("Please in")
  } 
  if (err.code === 'auth/email-already-in-use') {
    showError("Email already in use");
  }
  if (err.code === 'auth/weak-password') {
    showError("   Please input strong password");
  }
  else
  {
    console.log(err.code)
  }
});
    }

    else
    {
      showError("Password and confirm password not matched")
    }
  
}
  };



  const addusernameFirebase = async (username) => {
     
       
    try {
      
    
    const lowercaseEmail = email.toLowerCase();
     db.collection('Usernames')
         .doc(lowercaseEmail)
        .set({
          email:lowercaseEmail,
          Username:username,
          Value:'Engineer',
          Status:'Disabled',
        })
        .then(() => {
          // CheckData()
        console.log("Document written successfully")
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });

} catch(error){

}}


  return(
      

      <KeyboardAvoidingView    style={styles.Cardcontainer}>    
   
<Text style={{fontSize:50,fontWeight:'500',paddingRight:moderateScale(1)}}>Create new </Text>
<Text style={{fontSize:50,fontWeight:'500',}}>Account </Text>
<TouchableOpacity onPress={()=>navigation.navigate('Login')}>
     < Text style={{color:'black',fontSize:10 , padding:moderateScale(5), }}>  Already Registered ? Log in here</Text>
     </TouchableOpacity>
<Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(210),paddingTop:10}}>NAME</Text>
     
      <TextInput placeholder='Enter your name' value={username} textAlign='center' auto onChangeText={text=>setUsername(text)} style={styles.InputContainer} ></TextInput>
      
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