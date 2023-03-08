import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity ,Image} from 'react-native';
import { db } from './Firbase';


export default function ListEngineers({ navigation }) {
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
   
    const collectionRef = db.collection('Usernmaes');
    collectionRef.get().then((querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        documents.push({ ...data, id: doc.id });
      });
      setEngineers(documents);
    }).catch((error) => {
      console.log('Error getting engineers:', error);
    });
  }, []);

 
  const handleViewEngineer = (engineer) => {
    navigation.navigate('AdminShowRoute',{
        email:engineer.email,
        
    });
  };

  const handleAssignEngineer = (engineer) => {
    navigation.navigate('SelectRoute',{
        email:engineer.email,
        
    });
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
      <View style={{ flex: 1 , flexDirection:'row'}}>
   <Image source={require('../assets/Avatar.png')} style={{width:50,height:50}}></Image>
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
    <FlatList
      data={engineers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
