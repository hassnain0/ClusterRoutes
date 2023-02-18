import React from 'react-native'
import {StyleSheet,View, Button,Text,TouchableOpacity,Image,} from 'react-native'
import Temp from './Temp';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GOOGLE_MAPS_APIKEY } from './GoogleAPI';
import MapViewDirections from 'react-native-maps-directions';

export default function TemporaryCard({navigation}){
    return(
      <View  color='#1F6478' style={styles.Cardcontainer}>
      <Temp style={StyleSheet.absoluteFill}/>
     
       
      </View>
    )
}

const styles=StyleSheet.create({
    Cardcontainer: {
      flex: 1,
     
      backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:5,
        borderRadius:20,
        borderColor:'#007ACC',
        color:'#5388CE',    
        shadowOffset:'#33333',
        shadowOpacity:1,
        shadowColor:'#4C5053',
       

        margin:20,
        alignItems:'center'
        
        
        
      
      },

ViewContainer:{

},

              LottieContainer:{
                width:100,
              }
});
