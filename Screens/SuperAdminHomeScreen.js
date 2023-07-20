import React, {useEffect,useState} from "react";
import { StyleSheet,View, Text, TouchableOpacity, Alert, TextInput, ScrollView, BackHandler,Pressable,Image } from "react-native";
import { moderateScale,horizontalScale, verticalScale } from "./Dimension";

import { FloatingAction } from "react-native-floating-action";
import NetInfo from '@react-native-community/netinfo';
import firebase from "firebase/compat";
import { useFocusEffect, useNavigation } from "@react-navigation/native";




import { db,auth } from "./Firbase";
import { showAlert, showError, showSucess } from "./Helper/Helper";
import Login from "./Login";
import ListEngineers from "./ListEngineers";
import AdminList from "./AdminList";
import ListEngineersAdmin from "./ListEngineersSuper";


const SuperAdminHomeScreen=({navigation})=>{

 

  const [hasUserDocument, setHasUserDocument] = useState(false);
  useEffect(() => {
    const collectionRef = db.collection('Usernames').where('Status', '==', 'Disabled');
    collectionRef.get().then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        setHasUserDocument(true);
      } else {
        setHasUserDocument(false);
      }
    }).catch((error) => {
      console.log('Error getting documents:', error);
    });
  }, []);
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
    
    NavigationContainer.navigate("ListEngineersAdmin")
  }
  const RequestScreen=()=>{
   
    NavigationContainer.navigate("Request")
  }
  const AdminListScreen=()=>{
    
    NavigationContainer.navigate("AdminList")
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
    const ReportScreen=()=>{
      NavigationContainer.navigate("Reports")
    }
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
      onPress={AdminListScreen}
        style={[
          styles.TouchContainer2,
         
        ]}
       
       
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,}}>Admin's List     </Text>  
      </TouchableOpacity>
      
  <TouchableOpacity
      onPress={MoveScreen}
        style={[
          styles.TouchContainer2,
         
        ]}
       
       
      >
         <Text style={{  textAlign:'center',fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:90, color: 'white' ,}}>Engineer's List  </Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={ReportScreen}
        style={[
          styles.TouchContainer2,
         
        ]}
       
       
      >
         <Text style={{ textAlign:'center',fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:130,marginRight:135, color: 'white' ,}}>Reports  </Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={RequestScreen}
      style={[
        styles.TouchContainer2,
        ,
      ]}
    >
      
      <Text style={{ textAlign:'center', fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:110,marginRight:140, color: 'white', marginBottom:9 }}>
            Request's
        {hasUserDocument && (
          <Text style={{ color: 'red' ,fontSize:40}}>  • </Text>
        )}
      </Text>
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

export default SuperAdminHomeScreen;