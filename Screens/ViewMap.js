import React, { useState, useEffect ,useRef} from 'react';
import { StyleSheet, View,Dimensions,TouchableOpacity,Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE,ActivityIndicator,Polyline,AnimatedRegion } from 'react-native-maps';
import { db, firebase } from './Firbase';
import * as FileSystem from 'expo-file-system';
import xml2js, { parseString } from 'xml2js';

import { moderateScale } from './Dimension';
import ImagePath from './ImagePath';

import CalculateCard from './CalculateCard';
 
const ViewMap= ({route}) => {
const [polylines,setPolylines]=useState([]);
    
  const mapRef = useRef(null);
  const [Distance,setDistance]=useState([0]);
  const markerRef = useRef(null);
  //
  
   
  const [livecords, setLiveCords] = useState([
   
  ]);

  
  
  

    
  useEffect(() => {
    getKmlFile();
      AddPolycordinates();
    calculateTotalDistance(livecords)
  }, []);
  const screen=Dimensions.get('window')
const ASPECT_RATIO=screen.width/screen.height;
const LATITUDE_DELTA=0.9222;
const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;

 const [state,setState]=useState({
      
          
         
             currlocation:{
             latitude: 33.582045,
             longitude: 79.329376,
             
              
         },  
         
            
    }    )
  const {currlocation}=state               
         
   
         const [coordinates, setCoordinates] = useState([
         
        ]);

       

        
          


        const getKmlFile = async () => {
          try {
            // Retrieve KML file from Firebase Storage
            const engineerEmail = route.params.email;
            const storageRef = firebase.storage().ref(`${engineerEmail}.kml`);
            const downloadUrl = await storageRef.getDownloadURL();
      
            // Download the KML file
            const fileUri = FileSystem.documentDirectory + 'file.kml';
            await FileSystem.downloadAsync(downloadUrl, fileUri);
      
            // Parse the KML file
            const kmlContent = await FileSystem.readAsStringAsync(fileUri);
            const kmlJson = await xml2js.parseStringPromise(kmlContent);
            kmlJson.kml.Document[0].Folder.forEach((folder) => {
              if (folder.Placemark) {
                const placemarks = folder.Placemark;
                console.log("placemarks ",placemarks)
                placemarks.forEach((placemark) => {
                  // Get the name of the placemark
      
      
                  // Get the coordinates from the placemark's LineString object
                  if (placemark.LineString && placemark.LineString[0].coordinates) {
                    // Get the coordinates from the placemark's LineString object
                    const coordinatesString = placemark.LineString[0].coordinates[0].trim().split(/\s+/);
                    const placemarkCoordinates = coordinatesString.map((coordinateString) => {
                      const [lng, lat] = coordinateString.split(',').map(parseFloat);
                      return { latitude: lat, longitude: lng };
                    });
      
                    //  console.log(placemarkCoordinates )
      
                    // Add the remaining coordinates to the state
                    const polyline = <Polyline coordinates={placemarkCoordinates} strokeColor={'#FED55F'} strokeWidth={4} />;
      
                    // Add the new polyline to the state
                    setPolylines((prevPolylines) => [...prevPolylines, polyline]);
                    mapRef.current.fitToCoordinates(placemarkCoordinates, {
                      edgePadding: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      },
                    });
                  }
              
                });
      
              }
            });
      
          } catch (error) {
            console.log('Error retrieving or parsing KML file:', error);
          }
        };

  //  getLocation();
  //  Tracking();

  useEffect(() => {
    const interval = setInterval(() => {
      Get(); 
      AddPolycordinates();
    }, 3000);

    return () => clearInterval(interval)

  });

 



const AddPolycordinates=async()=>{
  const usersCollection=db.collection('LivePolyline')

  const currentUserEmail=route.params.email;
  // Query the collection for the document with the matching email
  const userDoc = await usersCollection.where('email', '==',currentUserEmail).get();
  
  // Retrieve the document data
  if (!userDoc.empty) {
       
      userDoc.forEach((doc) => {
      const data = doc.data();
   
      if(data.polylineCordinates !== undefined){
        const cordinates = data.polylineCordinates;
        const cordinateArray = Object.values(cordinates).map(cord => {
          // console.log(cord)
          return {
            latitude: cord.latitude,
            longitude: cord.longitude
          };
        });
        console.log("Fetching form firebase",cordinateArray);
        setLiveCords(cordinateArray);
      
        const covereddistance=data.distanceCovered
        console.log("Add Polyline livecords",livecords);
        console.log("distance",covereddistance)
        setDistance(covereddistance)
      }
       
      else{
       
      }
     
         })
    }
}

    const animate=(latitude,longitude)=>{
      const newCoordinate={latitude,longitude}
       if(markerRef.current){
     
         markerRef.current.animateMarkerToCoordinate(newCoordinate,7000);
       
      }
      
      }
    //GEt method to retreive live location
    const Get=async()=>{
      try{


        const usersCollection=db.collection('LiveLocation')
      
        const currentUserEmail=route.params.email;
        // Query the collection for the document with the matching email
        const userDoc = await usersCollection.where('email', '==',currentUserEmail).get();
        
        // Retrieve the document data
        if (!userDoc.empty) {
             
            userDoc.forEach((doc) => {
            const data = doc.data();
          
             const lat=data.latitude;
             const longitude=data.longitude;
            animate(lat,longitude)
                   
            setState({...state,
           
               
               currlocation:new AnimatedRegion({
                latitude: data.latitude,
                longitude: data.longitude,
                latitudeDelta:LATITUDE_DELTA,
                longitudeDelta:LONGITUDE_DELTA
                
               },

             
        
               ),  

            
          })

          });
         
            
        } else {
          console.log('No matching document!');
        }
          }
    
          catch(error){console.log(error)}
                     
        }
    


          // const handleStop = () => {
          //  setIsTracking(false)
        
          //  storePolyline();
           
            
          //  console.log(livecords)
          // };
        
    

          const  calculateTotalDistance=(coordinates) =>{
            let totalDistance = 0;
            for (let i = 0; i < coordinates.length - 1; i++) {
              const {latitude: lat1, longitude: lon1} = coordinates[i];
              const {latitude: lat2, longitude: lon2} = coordinates[i+1];
              const d = distance(lat1, lon1, lat2, lon2);
              totalDistance += d;
            }

            if(totalDistance>1){
            return totalDistance;
            }
            else
            {
              return 0;
            }
          }
          
          // calculate total distance covered from live coordinates
          const R = 6371; // radius of the earth in km

          const toRad=(deg) =>{
            return deg * (Math.PI/180);
          }
          
          const  distance=(lat1, lon1, lat2, lon2)=> {
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;
                
            return d;
                
          }





  return (
    
    <View style={styles.container}>
     <MapView
       
        ref={mapRef}

        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsIndoors={true}
       
   
        initialRegion={{ latitude: 33.738045 , longitude: 73.084488, latitudeDelta:LATITUDE_DELTA, longitudeDelta:LONGITUDE_DELTA  }}
      > 

      {polylines}


{livecords.length > 0  ? (
  <Polyline
    coordinates={livecords}
    strokeColor={'green'}
    strokeWidth={10}
  />
) : null}

{ Object.keys(currlocation).length > 0 && (
  <Marker.Animated
  draggable={true}

  ref={markerRef}
     
    title="Engineer live location"
    coordinate={currlocation}
    image={ImagePath.Engineer}
  />
)}

      </MapView>
    
   
 
      <View style={styles.BottomCard}>
      <View  style={{ position:'absolute',
        bottom:0,
        
     
        right:5,}}>
   <CalculateCard distance={Distance} />
   </View>
       
     
     
</View>
{/* ) } */}
    </View>
  );
  }
;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  TouchContainer:{
    backgroundColor:'green',
    borderWidth:2,
    
    borderRadius:1,
    alignItems:'center',
    height:48,
    justifyContent:'center',
    marginTop:16,
    borderColor:'white',
  },
  BottomCard:{
    backgroundColor:'white',
    width:'100%',
   
    borderTopEndRadius:24,
    borderTopStartRadius:24,
  } 
});

export default ViewMap;
