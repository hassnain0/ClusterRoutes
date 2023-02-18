import { showMessage } from "react-native-flash-message";
import { Alert } from "react-native";
import { PermissionsAndroid,Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { async } from "@firebase/util";

//Function of getting Current Location
export const getCurrentLocation =()=>
new Promise ((resolve,reject)=>{
Geolocation.getCurrentPosition(
    position=>{
        const cords={
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
        };
        resolve(cords);
    },
    error=>{
        reject(error.messages);

    },
    {enableHighAccuracy:true, timeout:15000, maximumAge:10000},
)
})


export const locationPermission=()=>new Promise(async(resolve,reject)=>{
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

    ).then((granted)=>{
        if(granted==PermissionsAndroid.RESULTS.GRANTED){
            resolve('granted')
        }
        return reject("Location Permission denied")
    }).catch((error)=>{
      Alert.alert("Ask Location Permission")
    })
})