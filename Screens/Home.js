import React, {useEffect} from "react";
import { StyleSheet,View,  Button, Text, TouchableOpacity, Alert, TextInput, ScrollView, Pressable,Image } from "react-native";
import { moderateScale,horizontalScale, verticalScale } from "./Dimension";
import { firebaseConfig } from "./Firbase";

import Login from "./Login";
import { locationPermission ,getCurrentLocation} from "./Function";
import  Map from './Map'
import storage from '@firebase/storage';
import TrackerFile from "./TrackerFile";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Temp from "./Temp";
import Card from "../Card";
import TemporaryCard from "./TemporaryCard";
import ImageCardHome from './ImageCardHome'
import ChooseRoute from "./ChooseRoute";
import { useNavigation } from "@react-navigation/native";
const Home=({navigation})=>{
  
    return(
      
        <View style={styles.MapContainer}>
       
       <ImageCardHome />
       <View style={{flex:1,flexDirection:'row',padding:moderateScale(10)}}>
        <Image source={require('../assets/icons8-pin-location-64.png')} style={{width:40}}/><Text style={{fontSize:20}}>Target your destination</Text>
<TouchableOpacity onPress={()=>navigation.navigate(Map)}>
<Image source={require('../assets/RightButton.png')}></Image>
</TouchableOpacity>
</View>
        <Text style={{fontWeight:'500',fontSize:20,marginTop:10,}}>Arround You</Text>
       
        <TemporaryCard/>
       
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