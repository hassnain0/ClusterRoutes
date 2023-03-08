import React, { useState, useEffect ,useRef} from 'react';
import { StyleSheet, View,Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE,AnimatedRegion } from 'react-native-maps';
import { firebase } from './Firbase';
import * as FileSystem from 'expo-file-system';
import xml2js, { parseString } from 'xml2js';
 import ImagePath from './ImagePath'

const AdminHomeScreen= ({route}) => {
  const [markers, setMarkers] = useState([]);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    const getKmlFile = async () => {
      try {
        // Retrieve KML file from Firebase Storage
        const engineerEmail = route.params.email;
        const storageRef = firebase.storage().ref(`${engineerEmail.email}.kml`);
        const downloadUrl = await storageRef.getDownloadURL();
  
        // Download the KML file
        const fileUri = FileSystem.documentDirectory + 'file.kml';
        await FileSystem.downloadAsync(downloadUrl, fileUri);
        console.log(fileUri)
  
        // Parse the KML file
        const kmlContent = await FileSystem.readAsStringAsync(fileUri);
        const kmlJson = await xml2js.parseStringPromise(kmlContent);
        console.log("", kmlContent)
  
        // Extract the coordinates from the KML data
        const placemarks = kmlJson.kml.Document[0].Placemark;
        console.log(placemarks)
        const markers = placemarks.map((placemark) => {
          const coordinateString = placemark.Point[0].coordinates[0].trim();
          const [longitude, latitude, altitude] = coordinateString.split(',');
          const coordinates = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
          console.log(coordinates)
          return coordinates;
        });
  
        // Set the coordinates as markers on the map
        setMarkers(markers);
  
        // Call animate function for each marker
        markers.forEach((marker) => {
          const { latitude, longitude } = marker;
          animate(latitude, longitude);
        });
  
      } catch (error) {
        console.log('Error retrieving or parsing KML file:', error);
      }
    };
  
    getKmlFile();
  }, []);

  
  
  useEffect(() => {
    if (mapReady && markers.length > 0) {
      mapRef.current.fitToCoordinates(markers, {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  }, [mapReady, markers]);

  const screen=Dimensions.get('window')
const ASPECT_RATIO=screen.width/screen.height;
const LATITUDE_DELTA=0.9222;
const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;


  return (
    <View style={styles.container}>
      <MapView
      ref={mapRef}
     
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      
        initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta:LATITUDE_DELTA, longitudeDelta:LONGITUDE_DELTA  }}
      > 
          {markers&&markers.map(marker => (
        
        <Marker.Animated
            key={`${marker.latitude},${marker.longitude}`}
            coordinate={marker}   
            pinColor={'blue'}
          
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AdminHomeScreen;
