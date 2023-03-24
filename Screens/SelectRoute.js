import React, {useEffect,useState} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from "@react-navigation/native";
import ViewMap from './ViewMap'
import { showSucess,showError } from './Helper/Helper';


import * as MailComposer from 'expo-mail-composer';
import {firebase} from './Firbase'

import * as FileSystem from 'expo-file-system';


const SelectRoute=({route})=>{
  console.log(route.params)

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
        
          'application/vnd.google-earth.kml+xml',
         
        ],
      });
      if (result.type === 'success') {
         
           const source={uri:result.uri}
      
        uploadFile(source);
       
       
    // NavigationContainer.navigate('AnotherAdminViewMap',{
        //   email:route.params}) 
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


 

  // const handleView=()=>{
  //   NavigationContainer.navigate('AnotherAdminViewMap',{

  //     email:route.params}) 
  //  }
  // const [state,setState]=useState({
    
  //   droplocationCords:{},
  //   pickupCords:{},
      
  //   })
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
       console.log("blob",fileSnapshot)
        await ref.put(blob);
        
        console.log(`Updated KML file in Firebase Storage at ${ref.fullPath}`);
      } else {
        // The file doesn't exist in Fire
           
        await ref.put(blob);
        
        console.log(`Uploaded KML file to Firebase Storage at ${ref.fullPath}`);
      }
    
       handleDone();
    
    };
    const createKmlFile = async (coordinates) => {
      try {
        // Convert coordinates to KML format
        const placemarks = coordinates.map((coord, index) => ({
          name: `Point ${index+1}`,
          styleUrl: '#icon-1899-0288D1-nodesc',
          Point: {
            coordinates: `${coord.longitude},${coord.latitude},0`
          }
        }));
        
        const kmlString = `<?xml version="1.0" encoding="UTF-8"?>
          <kml xmlns="http://www.opengis.net/kml/2.2">
            <Document>
              <name>Untitled layer</name>
              <Style id="icon-1899-0288D1-nodesc-normal">
                <IconStyle>
                  <color>ffd18802</color>
                  <scale>1</scale>
                  <Icon>
                    <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
                  </Icon>
                  <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
                </IconStyle>
                <LabelStyle>
                  <scale>0</scale>
                </LabelStyle>
                <BalloonStyle>
                  <text><![CDATA[<h3>$[name]</h3>]]></text>
                </BalloonStyle>
              </Style>
              <Style id="icon-1899-0288D1-nodesc-highlight">
                <IconStyle>
                  <color>ffd18802</color>
                  <scale>1</scale>
                  <Icon>
                    <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
                  </Icon>
                  <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
                </IconStyle>
                <LabelStyle>
                  <scale>1</scale>
                </LabelStyle>
                <BalloonStyle>
                  <text><![CDATA[<h3>$[name]</h3>]]></text>
                </BalloonStyle>
              </Style>
              <StyleMap id="icon-1899-0288D1-nodesc">
                <Pair>
                  <key>normal</key>
                  <styleUrl>#icon-1899-0288D1-nodesc-normal</styleUrl>
                </Pair>
                <Pair>
                  <key>highlight</key>
                  <styleUrl>#icon-1899-0288D1-nodesc-highlight</styleUrl>
                </Pair>
              </StyleMap>
              ${placemarks.map(placemark => `
              <Placemark>
                <name>${placemark.name}</name>
                <styleUrl>${placemark.styleUrl}</styleUrl>
                <Point>
                  <coordinates>${placemark.Point.coordinates}</coordinates>
                </Point>
              </Placemark>
              `).join('')}
             </Document>
          </kml>`;
        
        // Create a file in the app's document directory
        
        // await FileSystem.writeAsStringAsync(fileUri, kmlString, { encoding: FileSystem.EncodingType.UTF8 });
         console.log( "kml with out strniog ",kmlString)
        // console.log(`Created KML file at ${fileUri}`);
        return kmlString;
      } catch (error) {
        console.error(error);
      }
    };
    
    
    // const {droplocationCords,pickupCords}=state

//  const AddDataToFireStore = async () => {
//   const email=route.params.email;
//   const fileName =`${email}.kml`; 
//   const storageRef = firebase.storage().ref().child(fileName)

//   // Check if the file exists in Firebase Storage
  

//   const fileSnapshot = await storageRef.getMetadata().catch(() => null);
 
  
//   const kmlString = createKmlFile(cordinates);
//   const kmlBlob = new Blob([kmlString], { type: 'application/vnd.google-earth.kml+xml' });
  
//   if (fileSnapshot) {
//     // The file exists in Firebase Storage, so update it
//     await storageRef.updateMetadata({ contentType: 'application/vnd.google-earth.kml+xml' });
//     await storageRef.put(kmlBlob);
//     console.log(`Updated KML file in Firebase Storage  at ${storageRef.fullPath}`);
//     // sendEmail();
    
//   } else {
//     // The file doesn't exist in Firebase Storage, so create a new one
//     await storageRef.put(kmlBlob);
//     console.log(`Uploaded KML file to Firebase Storage at ${storageRef.fullPath}`);
//   }

//  }
 
  
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
  
    const email=route.params.email;
    MailComposer.composeAsync({
      recipients: [email],
      subject: 'Cluster Routes',
      body: 'New route is waiting for you \n Note: Please send back email of completion on same email when you done \n Thankyou Regards TNSS GLOBAL ',
    });
    showSucess(" Route Assigned sucessfully !")
  
   

  }              //Variables
   

//Methods to call pickdrop location cords

 
 


            
     
    return(
        <View style={styles.ViewContainer}>
          <ScrollView scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor:'white',flex:1,padding:24}}>


       
    
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