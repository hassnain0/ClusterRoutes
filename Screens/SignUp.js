import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ScrollView, Alert, ImageBackground } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from './Dimension';
import SignUPScreenCom from './SignUPScreen';

const SignUp= ({navigation}) => {


  // const app=initializeApp(firebaseConfig);
  // const auth=getAuth(app);

  

  return (
    <ScrollView>
    <ImageBackground  style={styles.ImageBackgroundcontainer}source={require('../assets/ImageBackground.jpeg')}>
   
    <SignUPScreenCom
   
      
         navigation={navigation}
      /> 
 
 </ImageBackground>
 </ScrollView>
  );

};

const styles=StyleSheet.create({
  ImageBackgroundcontainer: {
    width:414,
    height:896,
  flex: 1,
  flexDirection:'column',
  paddingLeft:horizontalScale(1),
  paddingRight:horizontalScale(10),
  paddingTop:horizontalScale(15),
  justifyContent: 'center',
  paddingHorizontal:horizontalScale(100),
  
  

  
},

LogoContainer:{
  

  backgroundColor:'white',
        elevation:3,
    
    borderRadius:10,
         
    
    borderColor:'#007ACC',
       
    paddingLeft:verticalScale(10),
    marginRight:moderateScale(150),
    paddingRight:verticalScale(10),
    paddingTop:horizontalScale(1),
    marginLeft:horizontalScale(130),
    marginBottom:horizontalScale(100),
    
    
    shadowOpacity:1,
    shadowColor:'#4C5053',
  marginBottom:moderateScale(10),
  
}
  
});

export  default SignUp;
