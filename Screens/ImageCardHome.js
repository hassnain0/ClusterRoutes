import React from 'react-native'
import {StyleSheet,View, Button,Text,TouchableOpacity,Image,} from 'react-native'
import Temp from './Temp';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';
import MapViewDirections from 'react-native-maps-directions';
import { moderateScale } from './Dimension';

export default function ImageBottomCard({navigation}){
    return(
      <View  color='#1F6478' style={styles.Cardcontainer}>
    <Image source={require('../assets/Image.jpg')} style={{width:340,height:330,borderRadius:15}}></Image>
      </View>
    )
}

const styles=StyleSheet.create({
    Cardcontainer: {
      flex: 1,
     
      backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:3,
        borderRadius:20,
        borderColor:'#007ACC',
        color:'#5388CE',    
        shadowOffset:'#33333',
        shadowOpacity:1,
        shadowColor:'#4C5053',
       padding:moderateScale(10),

        margin:20,
        alignItems:'center'
        
        
        
      
      },

ViewContainer:{

},

              LottieContainer:{
                width:100,
              }
});
