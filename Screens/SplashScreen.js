import React ,{useEffect} from 'react';
import {Image,StyleSheet, View } from 'react-native';
import Login from './Login';

const  SplashScreen = ({ navigation }) => {
 



  useEffect(() => {

    setTimeout(() => {
      navigation.navigate('Login');
    },3000 );

    return () => {
     
    };
  }, []);
  return (
    <View style={styles.container}>
     
        <Image source={require('../assets/SplashScreen.jpeg')} style={styles.image} />
     
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 500,
    height: 500,
  },
});

export default SplashScreen;
