import React,{useState,useRef,useEffect} from 'react'
import {StyleSheet,View, Text,TextInput,Button, ScrollView, Image,TouchableOpacity, Dimensions, Platform} from 'react-native';
import MapView, { Marker,PROVIDER_GOOGLE ,AnimatedRegion} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import {db } from './Firbase'
 // optional: for rendering

import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';

import { moderateScale } from './Dimension';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ImagePath from './ImagePath';
import CalculateCard from './CalculateCard';





     const ViewMap=({route}) =>{

      const mapRef= useRef()

     
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
        getCordinateskml();
        console.log("called ")
    
              fetchValuesiofEngineer();
              getCordinateskml();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchValuesiofEngineer();
      getCordinateskml();
     
        });
        return unsubscribe;
      }, [isFocused]);
     
      //Time interval of current locatio
      // useEffect(()=>{
      //   const interval=setInterval(()=>{
      //     Get();
      // fetchValuesiofEngineer();
      //      },6000);
      //   return ()=>clearInterval(interval)
      // })


      //Web View

       

 const animate=(latitude,longitude)=>{
  const newCoordinate={latitude,longitude}
   if(markerRef.current){
 
     markerRef.current.animateMarkerToCoordinate(newCoordinate,7000);
   
  }
  
  }
 

      const RouteDistance=(distance1)=>{
        setState(state=>({...state,distance:distance1}))
      }
     

      const getCordinateskml = async () => {
        const email = route.params.email;
        const ref = firebase.storage().ref();
        const result = await ref.listAll();
        const files = result.items.filter((item) => item.name.startsWith(email.email));
    
        if (files.length === 0) {
          console.error(`No KML files found for email: ${email}`);
          return;
        }
    
        const kmlFile = files[0];
        const kmlUrl = await kmlFile.getDownloadURL();
        const response = await fetch(kmlUrl);
        const kmlText = await response.text();
    
        // Extract the coordinates from the KML data
        const coordinatesString = kmlText.match(/<coordinates>(.*?)<\/coordinates>/s)[1];
        const coordinatePairs = coordinatesString.trim().split(/\s+/).map(coord => coord.split(',').reverse().map(parseFloat));
     
        console.log(coordinatePairs);  
        const pickupCords = coordinatePairs[0];
        const droplocationCords = coordinatePairs[1];
        setState({
          ...state,
          pickDropCords: {
            latitude: pickupCords[0],
            longitude: pickupCords[1]
          },
          endinglocation: {
            latitude: droplocationCords[0],
            longitude: droplocationCords[1]
          }
        });
      };    


const fetchValuesiofEngineer=async()=>{
  try{

const usersCollection = db.collection('KMLFile');
const currentUser = route.params.email;
const FinalEmail=currentUser.email;
console.log(currentUser)
const userRef = usersCollection.doc(FinalEmail);

// Get the document data
userRef.get().then((doc) => {
  if (doc.exists) {
    // The document exists, so you can access its data
    const data = doc.data();
    const file=data.KMLFILE
    const coordinatesString = file.match(/<coordinates>(.*?)<\/coordinates>/s)[1];
    const coordinatePairs = coordinatesString.trim().split(/\s+/).map(coord => coord.split(',').reverse().map(parseFloat));
 
      console.log(coordinatePairs);  
     const pickupCords=coordinatePairs[0]
     const droplocationCords=coordinatePairs[1]
     setState({...state,pickDropCords:{latitude:pickupCords[0],
     longitude:pickupCords[1]},


endinglocation:{latitude:droplocationCords[0],
longitude:droplocationCords[1]}
})
  } else {
    // The document doesn't exist
    console.log("No such document!");
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
         
        



{ Object.keys(pickDropCords).length > 0 && (
  <Marker
  draggable={true}
     
    title="Starting location of engineer"
    coordinate={pickDropCords}
    image={ImagePath.StartingLocation}
      />
)}


{endinglocation && Object.keys(endinglocation).length > 0 && (
  <Marker
    title="Destination location"
    coordinate={endinglocation}
   pinColor='blue'
  
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
            onStart={(params)=>{
              console.log(params.origin,"  ",)
            }}
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
export default ViewMap;