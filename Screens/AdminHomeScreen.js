import React, {useState,useEffect} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, TextInput, ScrollView, BackHandler,Pressable,Image } from "react-native";
import { moderateScale,horizontalScale, verticalScale } from "./Dimension";
import PushNotification from "react-native-push-notification";
import { FloatingAction } from "react-native-floating-action";
import DocumentPicker from 'react-native-document-picker';
import firebase from "firebase/compat";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SideMenu } from "./HeaderComponent";
import ChooseRoute from './ChooseRoute'
import Temp from "./Temp";
import Map from "./Map";
import { db,auth } from "./Firbase";
import { showAlert, showSucess } from "./Helper/Helper";
import Login from "./Login";
import ListEngineers from "./ListEngineers";


const AdminHomeScreen=({navigation})=>{

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
  const NavigationContainer=useNavigation();
  const MoveScreen=()=>{
    NavigationContainer.navigate("ListEngineers")
  }
useEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={logout}>
        <Image source={require('../assets/LogoutButton.png')} style={{width:30,height:30,marginRight:5}}></Image>
      </TouchableOpacity>
    ),
  });
}, [])
    
const logout = () => {
 
  auth
    .signOut()
    .then(() => showSucess("Successfully logout"));
    navigation.replace("Login")
}
    



        return(
      
        <View style={styles.ViewContainer}>

<View style={styles.CardContainer}>
  <Image source={require('../assets/HomeScreen.png')}    style={styles.ImageContainer}></Image>
  <TouchableOpacity
        style={[
          styles.TouchContainer,
          
        ]}
       onPress={MoveScreen}
      >

        <Text style={{ fontSize: 20,borderColor:'#002F46', alignItems: 'center',marginLeft:100,marginRight:100, color: 'white', }}>         Engineers         </Text>  
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

paddingTop:120,
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
        marginTop:50,
        alignItems:'center',
        justifyContent:'center'
      },
      TouchContainer:{
        backgroundColor:'#002F46',
        
        elevation:10,
        borderWidth:2,
          marginBottom:10, 
        borderRadius:15,
        alignItems:'center',
        height:70,
        justifyContent:'center',
        marginTop:16,
        borderColor:'white',
      },
});

export default AdminHomeScreen;