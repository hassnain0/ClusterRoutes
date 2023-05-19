import React, {useState,useEffect} from "react";
import { View,Alert,Text,TextInput,Button,TouchableOpacity, StyleSheet,KeyboardAvoidingView,Image} from "react-native";
import { horizontalScale,verticalScale,moderateScale } from "./Screens/Dimension";
import { db, firebaseConfig ,auth} from "./Screens/Firbase";
import NetInfo from '@react-native-community/netinfo';
import ForgotScreen from './Screens/ForgotSceen'
import Home from './Screens/Home';
import SignUp from "./Screens/SignUp";
import { signInWithEmailAndPassword,onAuthStateChanged,getAuth } from "@firebase/auth";
import AdminHomeScreen from "./Screens/AdminHomeScreen";
import firebase from "firebase/compat";
import { showError, showSucess } from "./Screens/Helper/Helper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import Map from "./Screens/Map";
import SelectRoute from "./Screens/SelectRoute";
import SuperAdminHomeScreen from "./Screens/SuperAdminHomeScreen";
import Spinner from 'react-native-loading-spinner-overlay';

const Card=({navigation})=>{
const [keyboardShown, setKeyboardShown] = useState(false);
 const [myEmail,setEmail] =useState('');
  const [myPassword,setPassword] =useState('');
 const [dataLoaded,setDataLoaded]=useState(false)
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
   
   
    return () => {
      unsubscribe();
    };
  }, []);

  const NavigationContainer=useNavigation();
  const MoveScreen=()=>{
NavigationContainer.navigate("ForgotScreen")
  }
  const MoveSignUP=()=>{
    setEmail('')
    setPassword('')
    NavigationContainer.navigate("SignUp")
   }
  //Method to move to admin or user home screen
  const handlePickerValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  const handleLogin = async () => {
    setDataLoaded(true)
   if(!isConnected){
    setDataLoaded(false)
    showError("Please connect your internet connnection")
    return ;
   }
  if (!myEmail || !myPassword) {
    setDataLoaded(false)
    showError("Please enter email and password");
  }  else
   {
 
    const lowercaseEmail=myEmail.toLowerCase();
    const doc = await db.collection('Usernames').doc(lowercaseEmail).get();
  
    if (doc.exists) {
    
      const data = doc.data();
      const value = data.Value;
      const status = data.Status;
      
        if(value=='Engineer')
          {
         
            if(status=='Disabled'){
              setDataLoaded(false)
              showError("  Wait untill administrator approved your request")
              return;
            }
           
            await  signInWithEmailAndPassword(auth,lowercaseEmail, myPassword).then(() => {
              showSucess("                Sucessfully Log In")
              setEmail('')
            setPassword('')
           navigation.navigate(Home)
           
            }).catch(error=>{
            if(error.code=='auth/too-many-request'){
              setDataLoaded(false)
              Alert.alert('Too many wrong attempts ! Account Disabled please reset your password')
            }
            if(error.code=='auth/wrong-password'){
              setDataLoaded(false)
              Alert.alert('Wrong Password')
            }
            if(error.code=='auth/user-not-found')
            {
              setDataLoaded(false)
              showError("User not found")
            }
            
            else{
              setDataLoaded(false)
              
            }
            })    
          }
         
         else if (value=='Admin'&&status=='Enabled') {
          if(status=='Disabled'){
            setDataLoaded(false)
            showError("              Wait untill administrator approved your request")
            return;
          }

          await  signInWithEmailAndPassword(auth,lowercaseEmail, myPassword).then(() => {
            showSucess("        Sucessfully Log In")
            setEmail('')
            setPassword('')
            navigation.navigate(AdminHomeScreen)
          
            }).catch(error=>{
            if(error.code=='auth/too-many-request'){
              setDataLoaded(false)
              Alert.alert('Too many wrong attempts ! Account Disabled please reset your password')
            }
            if(error.code=='auth/wrong-password'){
              setDataLoaded(false)
              Alert.alert('Wrong Password')
            }
            if(error.code=='auth/user-not-found')
            {
              setDataLoaded(false)
              showError("User not found")
            }
            
            else{
              setDataLoaded(false)
             
            }
            })
         
         
         }
         else if (value=='Super'&&status=='Enabled') {

          await  signInWithEmailAndPassword(auth,lowercaseEmail, myPassword).then(() => {
            showSucess("            Sucessfully Log In")
            setEmail('')
            setPassword('')
            navigation.navigate(SuperAdminHomeScreen)
          
            }).catch(error=>{
            if(error.code=='auth/too-many-request'){
              setDataLoaded(false)
              Alert.alert('Too many wrong attempts ! Account Disabled please reset your password')
            }
            if(error.code=='auth/wrong-password'){
              setDataLoaded(false)
              Alert.alert('Wrong Password')
            }
            if(error.code=='auth/user-not-found')
            {
              setDataLoaded(false)
              showError("User not found")
            }
            
            else{
              setDataLoaded(false)
            
            }
            })
         
         
         }
        }
        else{
          setDataLoaded(false)
          showError("Not found")
        }
      }     
}


  return( 
    <KeyboardAvoidingView style={styles.Cardcontainer} >   
     <Spinner
      visible={dataLoaded}
      textContent={'Loading...'}
      textStyle={{ color: '#FFF' }}
    />   
      <View >
     <Text style={{fontSize:50,fontWeight:'600',paddingRight:moderateScale(1),marginBottom:20}}>Login</Text>
</ View>
      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(200),paddingTop:10}}>EMAIL</Text>
      <TextInput placeholder='Enter email'  value={myEmail} textAlign='center' auto onChangeText={text=>setEmail(text)} style={styles.InputContainer} ></TextInput>
      <Text style={{fontSize:15,color:'#BCBCBC',paddingRight:moderateScale(180) }}>PASSWORD</Text>
      <TextInput placeholder='Enter password'  secureTextEntry={true}  value={myPassword} onChangeText={text=>setPassword(text)} textAlign='center' style={styles.InputContainer}></TextInput>
       <View style={styles.BottomCard}>
</View>
<TouchableOpacity style={styles.TouchContainer} onPress={handleLogin}>
    <Text style={{fontSize:20,alignItems:'center',color:'white',width:280,height:40,paddingTop:5,textAlign:'center'}}>Log in</Text>   
    </TouchableOpacity>
    <TouchableOpacity onPress={MoveScreen}>
   <Text style={{color:'#BCBCBC',fontSize:20,paddingTop:10,textAlign:'center'}}>Forgot   Pasword?</Text>
   
   </TouchableOpacity>
   <TouchableOpacity  style={styles.submitButton} onPress={MoveSignUP}>
   <Text  style={{color:'#B5B5B5',fontSize:15,}}> SignUp!</Text>
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
        marginTop:moderateScale(50),
      borderColor:'#007ACC',
      color:'#5388CE',    
       padding:moderateScale(50),
      shadowOpacity:1,
      shadowColor:'#4C5053',
      paddingTop:moderateScale(50),
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
      marginBottom:20,
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