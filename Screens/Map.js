import React,{useState,useRef,useEffect} from 'react'
import {StyleSheet,View, Text,TextInput,Button, ScrollView, TouchableOpacity} from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import {db } from './Firbase'

import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';
import firebase from "firebase/compat";
import ChooseRoute from './ChooseRoute';
import { moderateScale } from './Dimension';
import { useNavigation } from '@react-navigation/native';
import { map } from '@firebase/util';
import { useIsFocused } from '@react-navigation/native';

     const Map=({navigation}) =>{

      const isFocused = useIsFocused();
      useEffect(() => {
        fetchValues();
        const unsubscribe = navigation.addListener('focus', () => {
          fetchValues();
        });
        return unsubscribe;
      }, [isFocused]);
   
const [documentData, setDocumentData] = useState(null);


 
 
const [firpick,dropfir]=useState()

  const handleNavigation=()=>{
 navigation.navigate('ChooseRoute',fetchValues())
  

  
}

 const fetchValues=async()=>{
  try{
const usersCollection = db.collection('Route');


// Get the current user's email
const currentUserEmail = firebase.auth().currentUser.email;

// Query the collection for the document with the matching email
const userDoc = await usersCollection.where('email', '==', currentUserEmail).get();

// Retrieve the document data
if (!userDoc.empty) {
     
    userDoc.forEach((doc) => {
    const data = doc.data();
    setState({...state,startinglocation:data.pickupCords,endinglocation:data.droplocationCords})
    console.log('It works fine')
  });
} else {
  console.log('No matching document!');
}
  }
  catch(error){}
}


 
 




  
 
   
 

  
  const [state,setState]=useState({
    startinglocation:{
    latitude: 31.582045,
    longitude: 74.329376,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,
     
},
   endinglocation:{ 
    latitude:27.0611,
    longitude:68.2087,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,},
  })

  const mapRef= useRef()

 
const {startinglocation,endinglocation}=state
 

      //Methods to call latitude and longitude of current location
     
      return (
<View style={styles.ViewContainer}>
    <View style={{flex:1}}>
      <MapView
      provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={startinglocation}
        >
         
            
         <Marker
            coordinate={startinglocation}
            title='Target location'
                        pinColor="red"
                        
          />
          <Marker
           title="Final  location"
            coordinate={endinglocation}
            pinColor="green"
          />
     
       
          <MapViewDirections
            origin={startinglocation}
            initialRegion={startinglocation}
            destination={endinglocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="green"
            optimizeWaypoints={true}
            onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 10, right: 10, bottom: 10, left: 10, },
                  animated:true,
                  
                 
                })
           
               
           }
           
}
 />
         
      </MapView>
      </View>
<View style={styles.BottomCard}>
    
    <TouchableOpacity style={styles.TouchContainer} onPress={handleNavigation}>
    <Text style={{fontSize:20,alignItems:'center', marginTop:1}}>Choose Destination Location</Text>   
    </TouchableOpacity>
</View>
      </View>
  
   
      
  );
}

const styles=StyleSheet.create({
  BottomCard:{
    backgroundColor:'white',
    width:'100%',
    padding:moderateScale(10),
    borderTopEndRadius:24,
    borderTopStartRadius:24,
   

  },
  ViewContainer:{
    flex:1,
    flexDirection:'column',
  }
  ,

  TouchContainer:{
    backgroundColor:'white',
    borderWidth:2,

    borderRadius:1,
    alignItems:'center',
    height:48,
    justifyContent:'center',
    marginTop:16,
    borderColor:'black',
  }
})
export default Map;