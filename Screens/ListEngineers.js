import React, { useEffect, useState } from 'react';
import {Alert, View, Text, FlatList, TouchableOpacity,TextInput ,Image} from 'react-native';
import { db,firebase } from './Firbase';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListEngineers({ navigation }) {

  const [engineers, setEngineers] = useState([]);
  const [dataLoaded,setDataLoaded]=useState(true)
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
   
      const collectionRef = db.collection('Usernames').where('Status', '==', 'Enabled').where('Value', '==', 'Engineer');
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

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredEngineers = engineers.filter(
    (engineer) =>
      engineer.Username.toLowerCase().includes(searchText.toLowerCase())
  );
 
    const handleViewEngineer = (engineer) => {
    const email=engineer.email;
    const fileName = `${email}.kml`; 
    const storageRef = firebase.storage().ref().child(fileName);
    storageRef.getDownloadURL()
      .then((metadata) => {
        
        navigation.navigate('ViewMap',{
          email:engineer.email,         
      });
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
        Alert.alert("Engineer has no any route to covered")
        }
      });
   
  };

     const handleAssignEngineer = (engineer) => {
      console.log("engineer.Username",engineer.Username)
     navigation.navigate('SelectRoute',{

      
     email:engineer.email,
     username:engineer.Username        
    });
  };
 
  const renderItem = ({ item }) => (

    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
    
      <View style={{ flex: 1 , flexDirection:'row'}}>

   <Image source={require('../assets/Engineer.png')} style={{width:50,height:50}}></Image>
          <Text style={{ fontWeight: 'bold', fontSize: 16,marginTop:20 }}>      {item.Username}</Text>

      </View>

      <TouchableOpacity style={{ padding: 8 }} onPress={() => handleViewEngineer(item)}>
        <Text style={{ color: 'blue' ,fontSize:17}}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8 }} onPress={() => handleAssignEngineer(item)}>
        <Text style={{ color: 'blue',fontSize:17}}>Assign</Text>
      </TouchableOpacity>
    
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
