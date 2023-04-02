import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, ActivityIndicator, Polyline, AnimatedRegion, } from 'react-native-maps';
import { db, firebase } from './Firbase';
import * as FileSystem from 'expo-file-system';
import xml2js, { parseString } from 'xml2js';
import * as Location from 'expo-location'
import { moderateScale } from './Dimension';
import ImagePath from './ImagePath';
import { locationPermission, showError, showSucess } from './Helper/Helper';
import CalculateCard from './CalculateCard';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
const Map = ({ navigation }) => {
  // const [markers, setMarkers] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef(null);
  const [Distance, setDistance] = useState([0]);
  const markerRef = useRef(null);
  //

  const [livecords, setLiveCords] = useState([
  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  ]);

  const [polylines, setPolylines] = useState([]);

  // const [region, setRegion] = useState({

  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // });


  useEffect(() => {
    getKmlFile();
    AddPolycordinates();

  }, []);
  const screen = Dimensions.get('window')
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.9222;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [state, setState] = useState({



    currlocation: {
      latitude: 33.6844,
      longitude: 73.0479,


    },


  })
  const { currlocation } = state


  // const [coordinates, setCoordinates] = useState([]);


  const handleDone = () => {

    Alert.alert(
      'Done Route',
      'Are you sure you want  to done?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Done',
          onPress: () => handleDelete()
        }
      ],
      { cancelable: false }
    );
    return true;
  };
  const NavigationContainer = useNavigation();
  const handleDelete = async () => {
    const email = firebase.auth().currentUser.email;
    const fileName = `${email}.kml`;
    const storageRef = firebase.storage().ref().child(fileName)
    await storageRef.delete();

    deletefirestore();


    showSucess("Congratulations ! Kindly inform to admin as gmail")
    NavigationContainer.goBack();
  }

  const deletefirestore = () => {
    const usersCollection = db.collection('LivePolyline')
    const currentUser = firebase.auth().currentUser;
    const documentRef = usersCollection.doc(currentUser.uid);
    documentRef.delete();
  }
  const getKmlFile = async () => {
    try {
      // Retrieve KML file from Firebase Storage
      const engineerEmail = firebase.auth().currentUser.email;
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


  useEffect(() => {
    const interval = setInterval(() => {
      getMyLocation()
    },3000);

    return () => clearInterval(interval)

  });


  //Live Location
  const getMyLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy:true
    });

    const latitude = location.coords.latitude
    const longitude = location.coords.longitude

    storeData(latitude, longitude)
    Get();
    if (isTracking) {

      setLiveCords((prevCords) => {
        if (Array.isArray(prevCords)) {
          return [...prevCords, { latitude, longitude }];
        } else {
          return [{ latitude, longitude }];
        }
      });

    }
  }


  const AddPolycordinates = async () => {'.'
    const usersCollection = db.collection('LivePolyline')

    const currentUserEmail = firebase.auth().currentUser.email;
    // Query the collection for the document with the matching email
    const userDoc = await usersCollection.where('email', '==', currentUserEmail).get();

    // Retrieve the document data
    if (!userDoc.empty) {

      userDoc.forEach((doc) => {
        const data = doc.data();

        if (data.polylineCordinates !== undefined) {
          const cordinates = data.polylineCordinates;
          const cordinateArray = Object.values(cordinates).map(cord => {
            return {
              latitude: cord.latitude,
              longitude: cord.longitude
            };
          });
          console.log("Fetching form firebase", cordinateArray);
          setLiveCords(cordinateArray);

          const covereddistance = data.distanceCovered
          setDistance(covereddistance)
        }

        else {

        }

      })
    }
  }
  //Storing live polyline
    const startTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    if (livecords.length == null) {
      setLiveCords(latitude, longitude)
    
      setIsTracking(true);
    }
    else {
      setLiveCords((prevCords) => [...prevCords, { latitude, longitude }]);


      setIsTracking(true);
    }
  }


  const storePolyline = async () => {
    try {
      const usersCollection = db.collection('LivePolyline');
      const currentUser = firebase.auth().currentUser;
      const documentRef = usersCollection.doc(currentUser.uid);

      const documentSnapshot = await documentRef.get();
      const DistanceCovered = calculateTotalDistance(livecords)

      if (documentSnapshot.exists) {
        // The document already exists, so update it
        await documentRef.update({
          email: currentUser.email,
          polylineCordinates: livecords,
          distanceCovered: DistanceCovered
        });

      } else {
        // The document does not exist, so create a new one
        await documentRef.set({
          email: currentUser.email,
          polylineCordinates: livecords,
          distanceCovered: DistanceCovered
        });
        console.log('Document created polyline');
      }

      showSucess('Your location is stored');
    } catch (error) {
      console.error(error);
    }
  };

  //Storing live location
  const storeData = (lat, long) => {
    try {

      const usersCollection = db.collection('LiveLocation')
      const currentUser = firebase.auth().currentUser;



      // Add a new document to the collection with the user's data
      usersCollection.doc(currentUser.uid).set({

        email: currentUser.email,
        latitude: lat,
        longitude: long,


      })


    }
    catch (error) {
      console.log(error)
    }
  }
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude }
    if (markerRef.current) {

      markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);

    }

  }
  //GEt method to retreive live location
  const Get = async () => {
    try {


      const usersCollection = db.collection('LiveLocation')

      const currentUserEmail = firebase.auth().currentUser.email;
      // Query the collection for the document with the matching email
      const userDoc = await usersCollection.where('email', '==', currentUserEmail).get();

      // Retrieve the document data
      if (!userDoc.empty) {

        userDoc.forEach((doc) => {
          const data = doc.data();

          const lat = data.latitude;
          const longitude = data.longitude;
          animate(lat, longitude)

          setState({
            ...state,

            currlocation: new AnimatedRegion({
              latitude: data.latitude,
              longitude: data.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA

            },



            ),


          })

        })


      } else {
        console.log('No matching document!');
      }
    }

    catch (error) {
      console.log(error)
    }

  }



  const handleStop = () => {
    setIsTracking(false)

    storePolyline();
  };



  const calculateTotalDistance = (coordinates) => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const { latitude: lat1, longitude: lon1 } = coordinates[i];
      const { latitude: lat2, longitude: lon2 } = coordinates[i + 1];
      const d = distance(lat1, lon1, lat2, lon2);
      totalDistance += d;
    }
    
      return totalDistance.toFixed(2);
   
  }

  // calculate total distance covered from live coordinates
  const R = 6371; // radius of the earth in km

  const toRad = (deg) => {
    return deg * (Math.PI / 180);
  }

  const distance = (lat1, lon1, lat2, lon2) => {
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
        showsBuildings={true}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsIndoors={true}
    showsUserLocation={true}
    showsMyLocationButton={true}
        initialRegion={{ latitude: 33.738045, longitude: 73.084488, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
      >
       
        {polylines}

        {isTracking && livecords.length > 0 ? (
          <Polyline
            coordinates={livecords}

            strokeColor={'green'}
            strokeWidth={10}
          />
        ) : null}



{/* 
{ Object.keys(currlocation).length > 0 && (
  <Marker.Animated
  draggable={true}

  ref={markerRef}
     
    title="Your live location"
    coordinate={currlocation}
    image={ImagePath.LiveLocation}
  />
)} */}

      </MapView>

      <View style={styles.BottomCard}>

        <View style={{
          position: 'absolute',
          bottom: 0,

          paddingBottom: 80,
          right: 5,
        }}>
          <CalculateCard distance={Distance} />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 70 }}>
          <TouchableOpacity
            style={[
              styles.TouchContainer,
              {
                backgroundColor: isTracking ? 'red' : 'green',
              },
            ]}

            onPress={isTracking ? handleStop : startTracking}
          >
            <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginTop: 1, paddingLeft: 120, paddingRight: 90, color: 'white' }}>
              {isTracking ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.TouchContainer,
              {
                backgroundColor: 'red',
              },
            ]}

            onPress={handleDone}
          >
            <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginTop: 1, paddingLeft: 10, paddingRight: 30, color: 'white' }}>     Done
            </Text>
          </TouchableOpacity>
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
  TouchContainer: {
    backgroundColor: 'white',
    borderWidth: 2,

    borderRadius: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
    borderColor: 'white',
  },
  BottomCard: {

    backgroundColor: 'white',
    width: '100%',
    padding: moderateScale(10),
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  Cardcontainer: {
    flex: 1,

    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 10,
    borderColor: '#007ACC',
    color: '#5388CE',
    shadowOffset: '#33333',
    shadowOpacity: 1,
    shadowColor: '#4C5053',
    padding: moderateScale(10),

    margin: 20,
    alignItems: 'center'




  },
});

export default Map;
