import React from "react";
import { useState,useEffect} from "react";
import {View,Text,Image,FlatList,TextInput } from 'react-native'
import { Icon } from "react-native-elements";
import { db } from "./Firbase";


const Reports=()=>{
    
  useEffect(() => {
   
    const collectionRef = db.collection('Report');
    collectionRef.get().then((querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
    const data = doc.data();
    documents.push({ ...data, id: doc.id });
    setDataLoaded(false)
    });
    setEngineers(documents)}).catch((error) => {
    console.log('Error getting engineers:', error);
  })
}, []);
    const [searchText,setSearchText]=useState();
    const [engineers,setEngineers]=useState([])

    const filteredEngineers = engineers.filter(
        (engineer) =>
          engineer.Username.toLowerCase().includes(searchText.toLowerCase())
      );    

    const handleSearch = (text) => {
        setSearchText(text);
      };

    
    const renderItem = ({ item }) => (

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <View style={{ flex: 1 , flexDirection:'row'}}>
          <Image source={require('../assets/Engineer.png')} style={{width:50,height:50}}></Image>
              <Text style={{ fontWeight: 'bold', fontSize: 16,marginTop:20 }}>      Hello</Text>
          </View>
        </View>
      );
      return (
    
        <View>
      <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
              backgroundColor: '#fff',
              borderRadius: 8,
              margin: 16,
            }}
          >
            <Icon name="search" size={25} color="#ccc" style={{ padding: 8 }} />
            <TextInput
              style={{ flex: 1, height: 40, padding: 6 }}
              placeholder="            Search Engineer by name"
              onChangeText={handleSearch}
              value={searchText}
            />
          </View>
        <FlatList
          data={filteredEngineers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      );
}
export default Reports;