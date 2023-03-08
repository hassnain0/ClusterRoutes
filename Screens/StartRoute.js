import React,{useState,useRef,useEffect} from 'react'
import {StyleSheet,View, Text,TextInput,Button, ScrollView, Image,TouchableOpacity, Dimensions, Platform} from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE ,AnimatedRegion} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import {db } from './Firbase'
import * as Location from 'expo-location';
import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';
import firebase from "firebase/compat";

import { moderateScale } from './Dimension';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import ImagePath from './ImagePath';

import CalculateCard from './CalculateCard';






     const StartRoute=({route}) =>{

      const mapRef= useRef()
      console.log("Helo",route.params)
      //Marker Ref
      const markerRef=useRef()

const navigation=useNavigation();
      
      const [state,setState]=useState({
      
          
     pickDropCords:{
      latitude: 31.582045,
      longitude: 74.329376,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta:LONGITUDE_DELTA,
     },

        currlocation:{
        latitude: 31.582045,
        longitude: 74.329376,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA,
         
    },
       endinglocation:{
    latitude:0,
    longitude:0
       },
       isLoading:false,
       cordinates:new AnimatedRegion({
        latitude: 31.582045,
        longitude: 74.329376,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
       },

       ),
       
      //  distance:0,
      
    }
       )
    
    
    
    const {currlocation,endinglocation,pickDropCords,isLoading,cordinates,distance}=state
     
    const isFocused = useIsFocused();
 
    
    useEffect(() => {
   
      fetchValuesiofEngineer();
      getMyLocation();

      fetchValuesiofEngineer();
  const unsubscribe = navigation.addListener('focus', () => {
    fetchValuesiofEngineer();
    getMyLocation();
   
      });
      return unsubscribe;
    }, [isFocused]);

   
    //Time interval of current location
    useEffect(()=>{
      const interval=setInterval(()=>{
        getMyLocation();
      
      },6000);

      return ()=>clearInterval(interval)
    })

 


      // Current location
      const getMyLocation=async()=>{
    
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});

     const latitude=location.coords.latitude
     const longitude=location.coords.longitude
            
     storeData(latitude,longitude)
     Get();
      }


const storeData=(lat,long)=>{
  try{

  const usersCollection = db.collection('LiveLocation')
  const currentUser = firebase.auth().currentUser;



// Add a new document to the collection with the user's data
usersCollection.doc(currentUser.uid).set({
     
email: currentUser.email,
latitude:lat,
longitude:long,


})
console.log('Live location added to map')

  }
  catch(error){
    console.log(error)
  } 
} 

      
 

 const animate=(latitude,longitude)=>{
 const newCoordinate={latitude,longitude}
  if(markerRef.current){

    markerRef.current.animateMarkerToCoordinate(newCoordinate,7000);
  
 }
 
 }




      //Web View

      

      const RouteDistance=(distance1)=>{
        setState(state=>({...state,distance:distance1}))
      }
     
      

        //Getting live location from firebase
        const Get=async()=>{
          try{


            const usersCollection=db.collection('LiveLocation')
          
            const currentUserEmail=firebase.auth().currentUser.email;
            // Query the collection for the document with the matching email
            const userDoc = await usersCollection.where('email', '==',currentUserEmail).get();
            
            // Retrieve the document data
            if (!userDoc.empty) {
                 
                userDoc.forEach((doc) => {
                const data = doc.data();
                console.log("Fetching live location of user",data)
                 const lat=data.latitude;
                 const longitude=data.longitude;
                animate(lat,longitude)
                
                setState({...state,
                
                currlocation:{ 
                  latitude:data.latitude,
                  longitude: data.longitude,
                   },
                   
                   cordinates:new AnimatedRegion({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta:LATITUDE_DELTA,
                    longitudeDelta:LONGITUDE_DELTA
                    
                   },

                   console.log("Called")
            
                   ),  

                
              })
              });
              if (data.latitude === pickDropCords.latitude && data.longitude === pickDropCords.longitude) {
                // Clear the polyline and remove all markers except for the starting location marker
                mapRef.current && mapRef.current.getPolylines().forEach(polyline => polyline.setMap(null));
                mapRef.current && mapRef.current.getMarkers().forEach(marker => {
                  if (marker.getPosition().lat !== pickDropCords.latitude && marker.getPosition().lng !== pickDropCords.longitude) {
                    marker.setMap(null);
                  }
                });
            } else {
              console.log('No matching document!');
            }
              }
            }
              catch(error){console.log(error)}
                         
            }

const handleStop=async()=>{
  try {
    
    const usersCollection = db.collection('KMLFile');
    const currentUser = firebase.auth().currentUser.email
   

    // Get the document reference for the user's document
    const userRef = usersCollection.doc(currentUser);

// Check if the document exists
userRef.get().then((doc) => {
   
  if (doc.exists) {
    // Update the existing document with the new values
    userRef.update({
      email: currentUser,
      droplocationCords:endinglocation,
      pickupCords: pickDropCords,
      
    })
    .then(() => {
      console.log("Document updated successfully!");
      navigation.navigate("Map")
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  } 
});

console.log('Stop location of engineer',endinglocation,pickDropCords);

  } catch (error) {
    console.log(error)
  }
}

  


const fetchValuesiofEngineer=async()=>{
  try{

    const usersCollection = db.collection('KMLFile');
   const currentUser=route.params.email;
    console.log("Current User",currentUser)
    const userRef = usersCollection.doc(currentUser);
    
// Get the document data
userRef.get().then((doc) => {
  if (doc.exists) {

    console.log(doc)
    // The document exists, so you can access its data
    const data = doc.data();
    const file=data.KMLFILE
    const coordinatesString = file.match(/<coordinates>(.*?)<\/coordinates>/s)[1];
    const coordinatePairs = coordinatesString.trim().split(/\s+/).map(coord => coord.split(',').reverse().map(parseFloat));
 
    
     const pickupCords=coordinatePairs[0]
     const droplocationCords=coordinatePairs[1]
     setState({...state,pickDropCords:{latitude:pickupCords[0],
     longitude:pickupCords[1]},


endinglocation:{latitude:droplocationCords[0],
longitude:droplocationCords[1]}
})
  } else {
    // The document doesn't exist
    console.log("No such document !");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
      }
      catch(error){}
    }


 

 
 
 
 
//Dimension call
const screen=Dimensions.get('window')
const ASPECT_RATIO=screen.width/screen.height;
const LATITUDE_DELTA=0.9222;
const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;

      //Methods to call latitude and longitude of current location
     
      return (
<View style={styles.ViewContainer}>
    <View style={{flex:1}}>
    

      <MapView
        zoomEnabled={true}
        zoomControlEnabled={true}
        
      provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          ...currlocation,
          latitudeDelta:LATITUDE_DELTA,
          longitudeDelta:LONGITUDE_DELTA,
        }}
        >
         
            
    
{ Object.keys(currlocation).length > 0 && (
  <Marker.Animated
  draggable={true}

  ref={markerRef}
     
    title="Your live location"
    coordinate={cordinates}
    image={ImagePath.LiveLocation}
  />
)}



{pickDropCords && Object.keys(pickDropCords).length > 0 && (
  <Marker
  draggable={true}
     
    title="Starting location of route"
    coordinate={pickDropCords}
    pinColor="blue"  
  />
)}


{endinglocation && Object.keys(endinglocation).length > 0 && (
  <Marker
    title="Destination location"
    coordinate={endinglocation}
 
   
  />
)}


       
    
{endinglocation && Object.keys(endinglocation).length>0&& (<MapViewDirections
            origin={pickDropCords}
            destination={endinglocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor={"blue"}
            strokeWidth={6}
            lineCap="round"
            lineDashPattern={[0]}
            optimizeWaypoints={true}
            onReady={result => {
                console.log(" Distance" ,result.distance)
              RouteDistance(result.distance);

                mapRef.current.fitToCoordinates(result.coordinates, {
                  // edgePadding: { top: 10, right: 10, bottom: 10, left: 10, },
                  // animated:true,
                  
                 
                })
           
               
           }
          
 
       
          }
     
 />
       )

}

      </MapView>
      <View style={{
        position:'absolute',
        bottom:0,
        right:0,
      }} 

      
      >
 <View  style={{ position:'absolute',
        bottom:0,
        right:60,}}>
   <CalculateCard  distance={distance} />
   </View>
    </View>
      </View>
<View style={styles.BottomCard}>
    
    <TouchableOpacity style={styles.TouchContainer} onPress={handleStop}>
    <Text style={{fontSize:20,alignItems:'center', marginTop:1,color:'white'}}>Stop</Text>   
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
  Cardcontainer: {
    flex: 1,
   
    backgroundColor:'white',
      right:0,
      bottom:0,
      elevation:3,
      borderRadius:10,
      borderColor:'#007ACC',
      color:'#5388CE',    
      shadowOffset:'#33333',
      shadowOpacity:1,
      shadowColor:'#4C5053',
  
      
      
      
  },    


  DistanceContainer:{
    position:'absolute',
    backgroundColor:'white',
    bottom:0,
    right:0,
    elevation:3,
  },
  ViewContainer:{
    flex:1,
    flexDirection:'column',
  }
  ,

  TouchContainer:{
    backgroundColor:'red',
    borderWidth:2,

    borderRadius:1,
    alignItems:'center',
    height:48,
    justifyContent:'center',
    marginTop:16,
    borderColor:'white',
  }
})
export default StartRoute;