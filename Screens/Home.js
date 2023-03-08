import React, {useState} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, TextInput, ScrollView, BackHandler,Pressable,Image } from "react-native";
import { moderateScale,horizontalScale, verticalScale } from "./Dimension";

import { FloatingAction } from "react-native-floating-action";
import DocumentPicker from 'react-native-document-picker';
import  Map from './Map'

import ImageCardHome from './ImageCardHome'
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from '@react-navigation/native';
import { SideMenu } from "./HeaderComponent";


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

  const [file, setFile] = useState(null);


  //Method to upload document from device
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFilePath(result.uri);
      // Do something with the selected file, e.g. parse it as a KML/KMZ file
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.log(err);
      }
    }
  };
  
 
    return(
      
        <View style={styles.MapContainer}>
   
       <ImageCardHome />
       <View style={{flex:1,flexDirection:'row',padding:moderateScale(10)}}>
        <Image source={require('../assets/icons8-pin-location-64.png')} style={{width:50}}/><Text style={{marginiTop:5,fontSize:20}}>Target your destination</Text>
        <TouchableOpacity onPress={()=>navigation.navigate(Map)}>
         <Image source={require('../assets/RightButton.png')}></Image>
         </TouchableOpacity>
            
               <FloatingAction
                 name='ion|plus'
                 size={25}      
                 color='#002F46'  
  />
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

export default Home;