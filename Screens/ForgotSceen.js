import React, { useEffect, useState } from "react";
import {View,StyleSheet, ImageBackground} from 'react-native'
import { horizontalScale, moderateScale, verticalScale } from "./Dimension";
import ForgotScreenComponent from "./ForgotScreenComponent";

const ForgotScreen=({navigation})=>{

    return(
        <ImageBackground  style={styles.ImageBackgroundcontainer}source={require('../assets/ImageBackground.jpeg')}>
   
        <ForgotScreenComponent
       
          
             navigation={navigation}
          /> 
     
     </ImageBackground>
    )
}
const styles=StyleSheet.create({
    ImageBackgroundcontainer: {
      width:414,
      height:896,
    flex: 1,
    flexDirection:'column',
    paddingLeft:horizontalScale(1),
    paddingRight:horizontalScale(10),
    paddingTop:horizontalScale(200),
    justifyContent: 'center',
    paddingHorizontal:horizontalScale(100),
    
    
  
    
  },
 
  
    
  });
  
export default ForgotScreen;