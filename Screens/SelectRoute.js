import React, {useEffect,useState} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from "@react-navigation/native";
import ViewMap from './ViewMap'
import { showSucess,showError } from './Helper/Helper';


import * as MailComposer from 'expo-mail-composer';
import {db, firebase} from './Firbase'




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


const FirestoreReport=async()=>{
  let username=route.params.username;
  console.log("username");
  const email=route.params.email;
  const currentDate = new Date().toLocaleDateString();

  const Ref=db.collection("Reports").doc(email);
  await Ref.set({ AssignedDate: currentDate,Status:'Assigned' }, { merge: true });
   
  console.log(`Stored current date in Firestore for ${email}`);

}

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
        // The file doesn't exist in File
           
        await ref.put(blob);
        
      }
    
       console.log(`Uploaded KML file to Firebase Storage at ${ref.fullPath}`);
       
     FirestoreReport();
       handleDone();

       
       

      
    };
    
        const handleDone=()=>{
        try{
        const Email=route.params.email;
        MailComposer.composeAsync({
      recipients: [Email],
      subject: 'Cluster Routes',
      body: 'New route is waiting for you \n Note: Please send back email of completion on same email when you done \n Thankyou Regards TNSS GLOBAL ',
    });
  
    showSucess(" Route Assigned sucessfully !")
  }
  catch(erorr){
    console.log(erorr)
  }
  //   // try{
      
  //   //   db.collection('Reports')
  //   //   .doc(currentUser.uid)
  //   //  .set({
  //   //    email:Email,
  //   //    Status:'OnGoing'
    
  //   //  })
     
  //   // }
  //   // catch(erorr){
  //   //   console.log("Error")
  //   // }
  // }
  // catch(error){
  //   showError("Email is not sent to Engineer")
  // }

  }              

            
     
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