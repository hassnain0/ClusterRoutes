import React, {useEffect,useState} from "react";
import {StyleSheet,View,  Button, Text,TouchableOpacity, Alert, TextInput, ScrollView,  DrawerLayoutAndroid ,Pressable,Image, BackHandler } from "react-native";
import { moderateScale,horizontalScale, verticalScale } from "./Dimension";


// import TemporaryCard from "./TemporaryCard";
import ImageCardHome from './ImageCardHome'
import SelectRoute from "./SelectRoute";
import ListEngineers from "./ListEngineers";
import { useFocusEffect } from "@react-navigation/native";

const AdminHomeScreen =({navigation})=>{

  //Adding floating button to home screen

  const actions = [
    {
      text: "Upload KML File",
      icon: require("../assets/KML.png"),
      name: "KML file",
      position: 2
    },
    {
      text: "Upload KMZ file",
      icon: require("../assets/KMZ.png"),
      name: "KMZ file",
      position: 1
    },
    
  ];

  //Files array
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


  
    return(
      
        <View style={styles.MapContainer}>
     <View>
       <TouchableOpacity onPress={()=>navigation.navigate(SelectRoute)}>
       <ImageCardHome />
      
       </TouchableOpacity>  
       <TouchableOpacity  style={{margin:10,}}onPress={()=>navigation.navigate(ListEngineers)}>
       <ImageCardHome />
      
       </TouchableOpacity>  
       </View>
       <View>
       
       </View>
            
      
        </View>
      
    )
};

const styles=StyleSheet.create({
ViewContainer:{
paddingBottom:100,
flex:1,
justifyContent:'center',
alignItems:'center',
},
MapContainer:{
    
        flex: 1,
      
        flexDirection:'column',


       
        
    
        
      },

      CardContainer:{
        flex: 1, height: '100%', width: '100%', borderRadius: 10, 
        
        
      },
});

export default AdminHomeScreen;