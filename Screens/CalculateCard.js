import React from 'react-native'
import {StyleSheet,View, Text,} from 'react-native'
import { moderateScale } from './Dimension';

export default function CalculateCard({distance}){
    return(
      <View  color='#1F6478' style={styles.Cardcontainer}>
  <Text style={{fontWeight:'700',fontSize:15,}}>{distance} /kilometer's covered</Text>
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
