import React from "react";
import { StyleSheet, View ,Alert,Button, ScrollView,TouchableOpacity,Text} from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { horizontalScale, moderateScale, verticalScale } from "./Dimension";

const TrackerFile=({placeholderText,fetchAddress})=>{
  const handleAddress=(data,details)=>{
       const lat=details.geometry.location.lat;
       const lan= (details.geometry.location.lng);

  
       fetchAddress(lat,lan)
  }
return(
   <View style={styles.ViewContainer}>
  <View style={{innerWidth:10}}>
  <GooglePlacesAutocomplete
      placeholder={placeholderText}
     style={{backgroundColor:'#0D2B34'}}
      onPress={handleAddress}
      fetchDetails={true}
      query={{
        key: 'AIzaSyAnAywjku9xixy7lI9v4zh26a43-NVgoHA',
        language: 'en',
      }}
      styles={{

        textInput:styles.textInputContainer,
      }}
    />
  </View>
   </View>
)
}


const styles=StyleSheet.create({

ViewContainer:{
flex:1,

},container2:{
  backgroundColor:'white'
},

textInputContainer:{
  height:48,
  color:'black',
  fontSize:16,
  backgroundColor:'#F3F3F3'
}
})
export default TrackerFile;