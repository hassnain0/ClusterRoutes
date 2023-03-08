import React from 'react-native'
import {StyleSheet,View, Button,Text,TouchableOpacity,Image,} from 'react-native'
import Temp from './Temp';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';
import MapViewDirections from 'react-native-maps-directions';
import { moderateScale } from './Dimension';

export default function CalculateCard({distance}){
    return(
      <View  color='#1F6478' style={styles.Cardcontainer}>
  <Text style={{fontWeight:'700',fontSize:15,}}>{distance} /  kilometer remaining</Text>
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
        borderRadius:10,
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
