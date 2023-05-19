import { useFocusEffect, useRoute } from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import { StyleSheet,View,ScrollView, Text,BackHandler,Alert,Image, Keyboard, ImageBackground } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Card from '../Card';
import { moderateScale,horizontalScale,verticalScale, leftHorizontalScale, rightHorizontalScale } from "./Dimension";
import { onAuthStateChanged } from "@firebase/auth";
import { auth,db } from "./Firbase";
import Home from "./Home";
import AdminHomeScreen from "./AdminHomeScreen";
import { showError } from "./Helper/Helper";

const Login=({navigation})=>{
  const [currentScreenName, setCurrentScreenName] = useState('Login');
  const route = useRoute();
  const [isConnected,setIsConnected]=useState(true)

  useEffect(() => {
   
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
      
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
   onAuthStateChanged(auth, (user) => {
     if(!isConnected){
      showError("     Please connect your internet connection")
     }
   
      if (user) {
         const email = user.email;
      
        const docRef = db.collection('Usernames').doc(email);
      
        docRef.get().then((doc) => {
          

        const Value=doc.data().Value;
        const Status=doc.data().Status;
         
         
          if (doc.exists) {
         
            if(Value=='Admin'&&Status=='Enabled'){
        navigation.replace('AdminHomeScreen');
            }
            else if(Value=='Super'&&Status=='Enabled'){
              navigation.replace('SuperAdminHomeScreen');
            }
            else if(Value=='Engineer'&&Status=='Enabled'){
              navigation.replace('Home');
            }
      }
    });
  }
});
  }, [navigation]);
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
        <ImageBackground  style={styles.ImageBackgroundcontainer}source={require('../assets/ImageBackground.jpeg')}>
        <View style={styles.LogoContainer}>
        <Image  style={{width:115,height:115,borderRadius:10}} source={require('../assets/Logo.png')}></Image>
        </View>
          <Card
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
      borderRadius:5,
      borderColor:'#007ACC',
      paddingLeft:leftHorizontalScale(5),
      marginRight:rightHorizontalScale (150),
      paddingRight:verticalScale(1),
      marginLeft:horizontalScale(120),
      shadowOpacity:1,
      shadowColor:'#4C5053',
    }
  });
export default Login;