import React, {useEffect} from "react";
import { StyleSheet,View, Text, TouchableOpacity, Alert, TextInput, ScrollView, BackHandler,Pressable,Image } from "react-native";
import { moderateScale,horizontalScale, verticalScale } from "./Dimension";

import { FloatingAction } from "react-native-floating-action";

import firebase from "firebase/compat";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


import Temp from "./Temp";

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
  const NavigationContainer=useNavigation();
  const MoveScreen=()=>{
    NavigationContainer.navigate("ListEngineers")
  }
useEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={handlelogout}>
        <Image source={require('../assets/LogoutButton.png')} style={{width:30,height:30,marginRight:5}}></Image>
      </TouchableOpacity>
    ),
  });
}, [])
    
const logout = () => {
 
  auth
    .signOut()
    .then(() => showSucess("                    Successfully logout"));
    navigation.replace("Login")
}
    



        return(
      <ScrollView>
        <View style={styles.ViewContainer}>

<View style={styles.CardContainer}>
  <Image source={require('../assets/HomeScreen.png')}    style={styles.ImageContainer}></Image>
  <TouchableOpacity
      onPress={MoveScreen}
        style={[
          styles.TouchContainer2,
         
        ]}
       
       
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2}}>   Engineer's List  </Text>  
      </TouchableOpacity>
                     
</View>
  
         
      
        </View>
        </ScrollView>
      
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
TouchContainer2:{
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