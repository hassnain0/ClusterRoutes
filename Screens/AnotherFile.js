import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'expo-permissions';
import { View,Button,Text } from 'react-native';




  //Class start here
  const AnotherFile=()=>{
    const [location, setLocation] = useState();
    useEffect(() => {
        async function fetchData() {
          const granted = await requestLocationPermission();
          if (granted) {
            const watchId = Geolocation.watchPosition(
              position => {
                setLocation(position.coords);
              },
              error => {
                console.log(error);
              },
              {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 10
              }
            );
            return () => {
              Geolocation.clearWatch(watchId);
            };
          }
        }
        fetchData();
      }, []);
      

      //Permission location
      async function requestLocationPermission() {
    
          const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          } else {
            return false;
          }
              }
      useEffect(() => {
        async function fetchData() {
          const granted = await requestLocationPermission();
          if (granted) {
           
          }
        }
        fetchData();
      }, []);
    
  return (
    <View>
      {location ? (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text></Text>
      )}
    </View>
  );
      }
        

      export default AnotherFile;