import React, {useEffect,useState} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from "@react-navigation/native";
import ViewMap from './ViewMap'
import { showSucess,showError } from './Helper/Helper';
 import AnotherViewMapAdmin from './AnotherViewMapAdmin'
import TrackerFile from "./TrackerFile";

import {firebase} from './Firbase'
import AdminShowRoute from "./AdminShowRoute";



const SelectRoute=({route})=>{
  console.log(route.params)

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
        
          'application/vnd.google-earth.kml+xml',
          'application/vnd.google-earth.kmz',
        ],
      });
      if (result.type === 'success') {
         
           const source={uri:result.uri}
      
        uploadFile(source);
       
        showSucess('KML/KMZ file upload sucessfully')
        NavigationContainer.navigate('AnotherAdminViewMap',{
          email:route.params}) 
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actions = [
    {
      text: 'Upload  KML/KMZ File',
      icon: require('../assets/KML.png'),
      name: 'Upload',
      position: 1,
    },
   
  ];

  
  const handleActionSelect = () => {
    
    handleFilePick();
       
};


  const NavigationContainer=useNavigation();


  const [state,setState]=useState({
    
    droplocationCords:{},
    pickupCords:{},
      
    })
    const uploadFile = async (source) => {
      const response = await fetch(source.uri);
      const blob = await response.blob();
      const filename = source.uri.substring(source.uri.lastIndexOf('/') + 1);
      const fileExtension = filename.split('.').pop();
      const email=route.params.email
      const newFilename = `${email}.${fileExtension}`;
      const ref = firebase.storage().ref().child(newFilename);
      const fileSnapshot = await ref.getMetadata().catch(() => null);
      if (fileSnapshot) {
        // The file exists in Firebase Storage, so update it
       
        await ref.put(blob);
        
        console.log(`Updated KML file in Firebase Storage at ${ref.fullPath}`);
      } else {
        // The file doesn't exist in Fire
           
        await ref.put(blob);
        
        console.log(`Uploaded KML file to Firebase Storage at ${ref.fullPath}`);
      }
    
       
    
    };

    const createKmlFile = async (coordinates) => {
      try {
        // Convert coordinates to KML format
        const kmlString = `
          <?xml version="1.0" encoding="UTF-8"?>
          <kml xmlns="http://earth.google.com/kml/2.1">
            <Document>
              <name>Route.kml</name>
              <Placemark>
                <LineString>
                  <coordinates>
                    ${coordinates.map(coord => `${coord.longitude},${coord.latitude}`).join(' ')}
                  </coordinates>
                </LineString>
              </Placemark>
            </Document>
          </kml>
        `;
    
        // Create a file in the app's document directory
        // const fileName = 'Route.kml';
        // const fileUri = `${FileSystem.documentDirectory}${fileName}`;
        // await FileSystem.writeAsStringAsync(fileUri, kmlString, { encoding: FileSystem.EncodingType.UTF8 });
    
        // console.log(`Created KML file at ${fileUri}`);
        return kmlString;
      } catch (error) {
        console.error(error);
      }
    };

    
    const {droplocationCords,pickupCords}=state

 const AddDataToFireStore = async () => {
  const email=route.params.email;
  const fileName =`${email}.kml`; 
  const storageRef = firebase.storage().ref().child(fileName)

  // Check if the file exists in Firebase Storage
  

  const fileSnapshot = await storageRef.getMetadata().catch(() => null);
  
  if (fileSnapshot) {
    // The file exists in Firebase Storage, so update it
    const cordinates=[pickupCords,droplocationCords];
   
    const kmlString = createKmlFile(cordinates) // the KML string from your code snippet
    const kmlBlob = new Blob([kmlString], { type: 'application/vnd.google-earth.kml+xml' });
    await storageRef.put(kmlBlob);
    
    console.log(`Updated KML file in Firebase Storage at ${storageRef.fullPath}`);
  } else {
    // The file doesn't exist in Fire
    const cordinates=[pickupCords,droplocationCords];
    const kmlString = createKmlFile(cordinates)// the KML string from your code snippet
    const kmlBlob = new Blob([kmlString], { type: 'application/vnd.google-earth.kml+xml' });
    await storageRef.put(kmlBlob);
    
    console.log(`Uploaded KML file to Firebase Storage at ${storageRef.fullPath}`);
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
    NavigationContainer.navigate('AnotherAdminViewMap',{
      email:route.params}) }
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


<TrackerFile placeholderText="Select starting location"  fetchAddress={fetchPickupCords}/>
         
          <TrackerFile placeholderText="Select  desitnation location"  fetchAddress={fetchDestinationCode}/>
       
         
         <TouchableOpacity style={styles.submitButton} onPress={handleDone} >
         <Text style={styles.submitButtonText}>Assign</Text>
          </TouchableOpacity>   
          </ScrollView>  
          <FloatingAction
     
                 name='ion|plus'
                 size={25}      
                 color='#002F46'  
  
        actions={actions}
        onPressItem={handleActionSelect}
        showBackground={false}
       
      />         
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


export default SelectRoute;