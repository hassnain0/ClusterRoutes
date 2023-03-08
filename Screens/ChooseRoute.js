import React, {useEffect,useState,Component} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { moderateScale } from "./Dimension";
import { useNavigation } from "@react-navigation/native";
import  Map from './Map'

import TrackerFile from "./TrackerFile";
import Temp from './Temp'
import firebase from "firebase/compat";
import { onAuthStateChanged, } from "@firebase/auth";

import {db, firebaseConfig, } from './Firbase'
import { locationPermission, showError,showSucess } from "./Helper/Helper";

const ChooseRoute=()=>{

  const [uid, setUid] = useState();
  const [data,setData]=useState();
  const NavigationContainer=useNavigation();


  const [state,setState]=useState({
    
    droplocationCords:{},
    pickupCords:{},
      
    })
    
  

    const {droplocationCords,pickupCords}=state
  const AddDataToFireStore=()=>{
   
    // getLiveLocation();
    try{
    const usersCollection = db.collection('Route')
    const currentUser = firebase.auth().currentUser;


console.log('document added!')
// Add a new document to the collection with the user's data
usersCollection.doc(currentUser.uid).set({
  email: currentUser.email,
     droplocationCords:droplocationCords,
     pickupCords:pickupCords,
     
    })
   
    }
    catch(error){
      console.log(error)
    } 
  }
 
  
//   const getLiveLocation =async()=>{
//     const locationPermissiondenid=await locationPermission()
//     if(locationPermissiondenid){
//       let location = await Location.getCurrentPositionAsync({});
     
//        const lat=location.coords.latitude;
//        const lng=location.coords.longitude;
// console.log("pickup cords means live location",lat,lng)
// setState1({
//   ...state,pickupCords:{
//   latitude:lat,
//   longitude:lng,

// },

// }

// )
            
//     }
//   }
  
    const handleDone=()=>{
   if(Object.keys(pickupCords).length==0){
    showError("     Please enter your live  location")    
  }
      if(Object.keys(droplocationCords).length==0){
        showError("     Please enter your  current location")
      }

   else{

    AddDataToFireStore();
    showSucess(" Route Assigned sucessfully !")
    NavigationContainer.goBack()   }
    }

                //Variables
   

//Methods to call pickdrop location cords
const fetchPickupCords=(lat,lng)=>{
  try{
   setState({
     ...state,pickupCords:{
     latitude:lat,
     longitude:lng,
   
   },

 })
 }
 catch(error){
   console.log(error)
 }
 }
 


            //Methods to call latitude and longitude of target location
      const fetchDestinationCode=(lat,lng)=>{
       try{
        setState({
          ...state,droplocationCords:{
          latitude:lat,
          longitude:lng,
        
        },
})
      }
      catch(error){
        console.log(error)
      }
      }
   
      console.log(" drop location cord  from user",droplocationCords);
     
    return(
        <View style={styles.ViewContainer}>
          <ScrollView scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor:'white',flex:1,padding:24}}>


<TrackerFile placeholderText="Select your starting location of route"  fetchAddress={fetchPickupCords}/>
         
          <TrackerFile placeholderText="Select your target location"  fetchAddress={fetchDestinationCode}/>
       
         
         <TouchableOpacity style={styles.submitButton} onPress={handleDone} >
         <Text style={styles.submitButtonText}>Go</Text>
          </TouchableOpacity>   
          </ScrollView>  
         
        </View>
       

    )
};

const styles=StyleSheet.create({
ViewContainer:{

flex:1,


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


export default ChooseRoute;