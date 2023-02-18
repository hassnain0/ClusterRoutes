import React from "react";
import { StyleSheet,View,  Image, Button, Text,ScrollView } from "react-native";
import Card from "../Card";
import { moderateScale,horizontalScale,verticalScale } from "./Dimension";
import  Map from './Map'
const Login=({navigation})=>{
    return(
      <ScrollView scrollEnabled={false}>
        <View  style={styles.ImageBackgroundcontainer}>
         <View>
          <Card navigation={navigation}/> 
          </View>
        </View>
        </ScrollView>
    )
};

const styles=StyleSheet.create({

  ImageBackgroundcontainer: {
    flex: 1,
  
    flexDirection:'column',
   padding:moderateScale(90),
  

    justifyContent: 'center',
    paddingHorizontal:horizontalScale(40),
    

    
  },
});

export default Login;