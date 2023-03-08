import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const AssignRouteScreen = () => {
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    // Fetch the list of engineers from your database or API
    // and update the engineers state
    const fetchEngineers = async () => {
      // Call your API or database to fetch the list of engineers
      const engineers = await fetch('https://your-api.com/engineers');
      const data = await engineers.json();
      setEngineers(data);
    };

    fetchEngineers();
  }, []);

  const handleAssignRoute = () => {
    // Implement your logic to assign a route to an engineer
    console.log('Assigning route', route, 'to engineer', selectedEngineer);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign and View Routes</Text>

      <View style={styles.assignRoute}>
        <Text style={styles.label}>Select Engineer:</Text>
        <FlatList
          data={engineers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text
              style={[
                styles.engineer,
                item.id === selectedEngineer ? styles.selected : null,
              ]}
              onPress={() => setSelectedEngineer(item.id)}
            >
              {item.name}
            </Text>
          )}
        />

        <Text style={styles.label}>Route:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter route"
          value={route}
          onChangeText={(text) => setRoute(text)}
        />

        <Button title="Assign Route" onPress={handleAssignRoute} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  assignRoute: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  engineer: {
    fontSize: 16,
    paddingVertical: 5,
  },
  selected: {
    backgroundColor: '#e6e6e6',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});

export default AssignRouteScreen;
