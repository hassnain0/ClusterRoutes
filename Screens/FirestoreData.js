import React,{useState} from 'react';
import {View,Text,Button, Keyboard, TouchableOpacity} from 'react-native';
import {db } from './Firbase'
const FirestoreData=()=>{
 
    const myCollection=db.collection('Routes').doc('PickandDrop');
    console.log(myCollection)
    myCollection.add("hello")
    return(
     <View>
      <TouchableOpacity > 
        <Text></Text>
      </TouchableOpacity>
     </View>
    )
    }
export default FirestoreData;