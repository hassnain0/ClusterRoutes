import React, {useEffect,useState,Component} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { moderateScale } from "./Dimension";
import { useNavigation } from "@react-navigation/native";
import  Map from './Map'
import fetchValuesFunction from "./fetchValuesFunction";
import TrackerFile from "./TrackerFile";
import Temp from './Temp'
import firebase from "firebase/compat";
import { onAuthStateChanged, } from "@firebase/auth";

import {db, firebaseConfig, } from './Firbase'
import Home from "./Home";

const ChooseRoute=()=>{

  const [uid, setUid] = useState(null);
  const [data,setData]=useState();
  const NavigationContainer=useNavigation();

  const AddDataToFireStore=()=>{
   
    const usersCollection = db.collection('Route')
    const currentUser = firebase.auth().currentUser;

// Add a new document to the collection with the user's data
usersCollection.doc(currentUser.uid).set({
  email: currentUser.email,
  pickupCords,
  droplocationCords
 

})
console.log('document added!')    
  }
 
  

    const handleDone=()=>{
      if(pickupCords==null&&droplocationCords==null){
      Alert.alert("   Please select location")
      }
      else{

        AddDataToFireStore();
        NavigationContainer.navigate(Map)
    
      }
 
          }

            //Variables
    const [state,setState]=useState({
        pickupCords,droplocationCords,
      })

    

      const {pickupCords,droplocationCords}=state

//Methods to call pickdrop location cords
         const fetchAddressCorde=(lat,lng)=>{
       console.log(" pickupCords Latitude",lat)
        console.log(" pickupCords longitude",lng)
        setState({
          ...state,pickupCords:{
          latitude:lat,
          longitude:lng,
        }})
      }
            //Methods to call latitude and longitude of target location
      const fetchDestinationCode=(lat,lng)=>{
        console.log(" Destination Latitude",lat)
        console.log(" Destination longitude",lng)
        setState({
          ...state,droplocationCords:{
          latitude:lat,
          longitude:lng,
        }})
      }
      console.log(" Pickup cords",pickupCords)
      console.log(" drop location cord ",droplocationCords);
     
    return(
        <View style={styles.ViewContainer}>
          <ScrollView scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor:'white',flex:1,padding:24}}>


          <TrackerFile placeholderText="Select your current location"
          fetchAddress={fetchAddressCorde}/>

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