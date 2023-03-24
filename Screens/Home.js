import React, {useState,useEffect} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, TextInput, ScrollView, BackHandler,Pressable,Image } from "react-native";
import { moderateScale,horizontalScale, verticalScale } from "./Dimension";

import firebase from "firebase/compat";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ChooseRoute from './ChooseRoute'
import Temp from "./Temp";
import Map from './Map'
import { db,auth } from "./Firbase";
import { showAlert, showSucess } from "./Helper/Helper";
import Login from "./Login";

const Home=({navigation})=>{

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel'
            },
            {
              text: 'Exit',
              onPress: () => BackHandler.exitApp()
            }
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
useEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={logout}>
        <Image source={require('../assets/LogoutButton.png')} style={{width:30,height:30,marginRight:5}}></Image>
      </TouchableOpacity>
    ),
  });
}, [])
    
const handlelogout=()=>{
  Alert.alert(
    'Done Route',
    'Are you sure you want  to logout?',
    [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: () =>logout()
      }
    ],
    { cancelable: false,
      titleStyle: { color: 'red' },
      messageStyle: { color: 'blue' }, }
  );
  return true;
};

const logout = () => {
 
  
  auth
    .signOut()
    .then(() => showSucess("Successfully logout"));
    navigation.replace("Login")
}
    const MoveScreen=()=>{
      NavigationContainer.navigate("ChooseRoute")
    }

// }
 const NavigationContainer=useNavigation();
const checkDocExists=()=>{
 const email=firebase.auth().currentUser.email

const fileName = `${email}.kml`; 
const storageRef = firebase.storage().ref().child(fileName);
storageRef.getDownloadURL()
  .then((url) => {
    NavigationContainer.navigate("Map")
    
  })
  .catch((error) => {
    Alert.alert("You have no any route to covered")
  });

    };

        return(
      
        <View style={styles.ViewContainer}>

<View style={styles.CardContainer}>
  <Image source={require('../assets/HomeScreen.png')}    style={styles.ImageContainer}></Image>
  <TouchableOpacity
        style={[
          styles.TouchContainer,
          
        ]}
       onPress={checkDocExists}
      >

        <Text style={{ fontSize: 20,borderColor:'#002F46', alignItems: 'center',marginLeft:100,marginRight:100, color: 'white', }}>         Route         </Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={MoveScreen}
        style={[
          styles.TouchContainer2,
         
        ]}
       
       
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2}}>   Create Route  </Text>  
      </TouchableOpacity>
                
</View>

    <View style={styles.ImageBackgroundcontainer}>
    <Temp />    
      </View>     
         
      
        </View>
      
    )
};


const styles=StyleSheet.create({
ViewContainer:{
flexDirection:'column',
flex:1,

},

ImageBackgroundcontainer: {

paddingTop:10,
flex: 1,
flexDirection:'column',
padding:20,

elevation:5,









},
MapContainer:{
    
        flex: 1,
      
        flexDirection:'column',
  width:500,
  height:400

       
        
    
        
      },

      ImageContainer:{
        marginBottom:20,
        width:300,
        height:200,
        marginRight:20
      },


      CardContainer:{
        flex: 1, height: '100%', width: '100%', borderRadius: 10, 
        marginTop:60,
        alignItems:'center',
        justifyContent:'center'
      },
      TouchContainer:{
        backgroundColor:'#002F46',
        
        elevation:10,
        borderWidth:2,
          marginBottom:20, 
        borderRadius:15,
        alignItems:'center',
        height:70,
        justifyContent:'center',
        marginTop:16,
        borderColor:'white',
      },  TouchContainer2:{
        backgroundColor:'#002F46',
        
        elevation:10,
        borderWidth:2,
          marginBottom:100, 
        borderRadius:15,
        alignItems:'center',
        height:70,
        justifyContent:'center',
        marginTop:16,
        borderColor:'white',
      },
});

export default Home;