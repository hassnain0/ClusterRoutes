import React, {useState} from "react";
import { View,Alert,Text,TextInput,Button,TouchableOpacity, StyleSheet,KeyboardAvoidingView,Image} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { horizontalScale,verticalScale,moderateScale } from "./Dimension";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';
// import { initializeApp } from "@firebase/app";
// import {getAuth} from '@firebase/auth'


const Temp=({navigation})=>{



  // const app=initializeApp(firebaseConfig);
  // const auth=getAuth(app);
  
  

  return(
      

      
    <MapView
    style={styles.Cardcontainer}
    initialRegion={{
      latitude:25.416868,
      longitude:68.274307,
      latitudeDelta:1.6164,
      longitudeDelta:18.0269,
    }
    
  }
  >
     <Marker
        coordinate={{  latitude:31.582045,
      longitude:74.329376,
      latitudeDelta:1.6164,
      longitudeDelta:18.0269,}}
        title="Initial location"
        pinColor="red"
      />
      <Marker
     
        coordinate={{  latitude: 14.343,
          longitude: 1600,
          latitudeDelta: 0.002,
          longitudeDelta: 0.0002,}}
        title="Target Location"
        pinColor="red"
      />
 
   
      <MapViewDirections
        origin={{latitude:25.416868,
            longitude:68.274307,
            latitudeDelta:1.6164,
            longitudeDelta:18.0269}}
        destination={{ latitude: 14.343,
          longitude: 1600,
          latitudeDelta: 0.002,
          longitudeDelta: 0.0002,}}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="green"
      />
    
  </MapView>   

  )
}

const styles = StyleSheet.create({
  Cardcontainer: {
    
    flex: 1,
    width:'100%',
   borderBottomEndRadius:100,
    elevation:1,
    borderRadius:20,
    borderColor:'#007ACC',
    color:'#5388CE',    
    shadowOffset:'#33333',
    shadowOpacity:1,
    shadowColor:'#4C5053',
    paddingTop:80,
    paddingBottom:20,
    alignItems:'center'
    

  
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
 
    
    padding:moderateScale(5),
    alignItems: "center",
    margin:1,
    },
    submitButtonText: {
    color: "#fff",
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
export default Temp;