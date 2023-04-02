import React, {useState} from "react";
import { StyleSheet,View,  Alert, ScrollView } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from "@react-navigation/native";

import { showSucess,showError } from './Helper/Helper';

import {firebase} from './Firbase'



const ChooseRoute=()=>{
  

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
       
        showSucess('KML/KMZ file upload sucessfully')

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


  const NavigationContainer=useNavigation();


  const handleView=()=>{
    NavigationContainer.navigate('AnotherAdminViewMap',{

      email:route.params}) 
   }
  const [state,setState]=useState({
    
    droplocationCords:{},
    pickupCords:{},
      
    })
    const uploadFile = async (source) => { 
     
      const response = await fetch(source.uri);
      const blob = await response.blob();
      const filename = source.uri.substring(source.uri.lastIndexOf('/') + 1);
      const fileExtension = filename.split('.').pop();
      const email=firebase.auth().currentUser.email;
      
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
    
       
    
    };
   
    
    const {droplocationCords,pickupCords}=state


  
   
 


            //Methods to call latitude and longitude of target location
    
     
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


export default ChooseRoute;