import React,{useEffect,useState} from 'react-native'
import {StyleSheet,View, Button,Text,TouchableOpacity,Image,} from 'react-native'
import Temp from './Temp';
import MapView, { Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';
import MapViewDirections from 'react-native-maps-directions';
import { locationPermission, } from './Helper/Helper';
import { useIsFocused } from '@react-navigation/native';


export default function TemporaryCard({navigation}){

  
      const isFocused = useIsFocused();
  //Getting live location

//   useEffect(()=>{
//               getMyLocation  ();
//   })
 

//  const getMyLocation = async()=>{
//   const locationPermissiondenid=await locationPermission()
//   if(locationPermissiondenid){
//     let location = await Location.getCurrentPositionAsync({});
   
//     setState({...state,currlocation:{
//       latitude:location.coords.latitude,
//       longitude:location.coords.longitude,


//     }})}
// }
  
      
const {currlocation,endinglocation,isLoading}=state

      const [state,setState]=useState({
        currlocation:{
        latitude: 31.582045,
        longitude: 74.329376,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421,
         
    },
       endinglocation:{
    
       },
       isLoading:false}
       )

  return(
      <View  color='#1F6478' style={styles.Cardcontainer}>
      <Temp style={StyleSheet.absoluteFill}/>
     
      <View style={{flex:1}}>
      <MapView
      provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        // initialRegion={{
        //   ...currlocation,
        //   latitudeDelta:LATITUDE_DELTA,
        //   longitudeDelta:LONGITUDE_DELTA,
        // }}
        >
         
            
         <Marker
            coordinate={currlocation}
            title='Live location'
                     
                        image={ImagePath.currentlocation}             
          />

          {Object.keys(endinglocation).length>0&&
          <Marker
          
           title="live  location"
            coordinate={endinglocation}
            pinColor="red"
          />
          }
       
       {Object.keys(endinglocation).length>0&& <MapViewDirections
            origin={currlocation}
            destination={endinglocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="red"
            optimizeWaypoints={true}

            onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 10, right: 10, bottom: 10, left: 10, },
                  animated:true,
                  
                 
                })
           
               
           }
          
           
}
     
 />
}
      </MapView>
      </View>

      </View>
    )
}

const styles=StyleSheet.create({
    Cardcontainer: {
      flex: 1,
     
      backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:5,
        borderRadius:20,
        borderColor:'#007ACC',
        color:'#5388CE',    
        shadowOffset:'#33333',
        shadowOpacity:1,
        shadowColor:'#4C5053',
       

        margin:20,
        alignItems:'center'
        
        
        
      
      },

ViewContainer:{

},

              LottieContainer:{
                width:100,
              }
});
