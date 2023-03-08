import { useFocusEffect } from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import { StyleSheet,View,ScrollView, Text,BackHandler,Alert,Image, Keyboard, ImageBackground } from "react-native";

import Card from "../Card";

import { moderateScale,horizontalScale,verticalScale } from "./Dimension";

const Login=({navigation})=>{
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

    const [keyboardShown, setKeyboardShown] = useState(false);
    return(


        <ImageBackground  style={styles.ImageBackgroundcontainer}source={require('../assets/ImageBackground.jpeg')}>
           <View style={styles.LogoContainer}>
         <Image  style={{width:100,height:100}} source={require('../assets/Logo.png')}></Image>
    </View>
        
          <Card
          
               style={{ transform: [{ translateY: keyboardShown ? -100 : 0 }] }}
               navigation={navigation}
            /> 
        
        </ImageBackground>
    );


}
const styles=StyleSheet.create({

    ImageBackgroundcontainer: {
        width:414,
        height:896,
      flex: 1,
      flexDirection:'column',
      paddingLeft:horizontalScale(1),
      paddingRight:horizontalScale(10),
      paddingTop:horizontalScale(100),
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
export default Login;