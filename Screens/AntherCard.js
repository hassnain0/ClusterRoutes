import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";

const AddTeacher = () => {
  const [fullName, setFullName] = useState("");
  
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [highestDegree, setHighestDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [institutionAttended, setInstitutionAttended] = useState("");
  const [datesOfAttendance, setDatesOfAttendance] = useState("");
  const [previousTeachingExperience, setPreviousTeachingExperience] = useState("");
 
  const [jobTitle, setJobTitle] = useState("");
  const [relevantSkills, setRelevantSkills] = useState("");
  const [daysAndHoursAvailable, setDaysAndHoursAvailable] = useState("");
  const [availabilityToStartWork, setAvailabilityToStartWork] = useState("");
 

  const handleSubmit=()=>{
    if (!contactNumber && !fullName &&!highestDegree&&! jobTitle&&!previousTeachingExperience&&!jobTitle&&!relevantSkills&&!availabilityToStartWork&&!daysAndHoursAvailable) {
      Alert.alert('Error', 'Please fill in all required fields');
     
  }
}
  return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
      />

      <Text style={styles.sectionTitle}>Educational Background</Text>
      <TextInput
        style={styles.input}
        placeholder="Highest Degree Earned"
        value={highestDegree}
        onChangeText={(text) => setHighestDegree(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Field of Study"
        value={fieldOfStudy}
              onChangeText={(text) => setFieldOfStudy(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Institution Attended"
        value={institutionAttended}
        onChangeText={(text) => setInstitutionAttended(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dates of Attendance"
        value={datesOfAttendance}
        onChangeText={(text) => setDatesOfAttendance(text)}
      />

      <Text style={styles.sectionTitle}>Work Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Previous Teaching Experience"
        value={previousTeachingExperience}
        onChangeText={(text) => setPreviousTeachingExperience(text)}
      />
   
      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={jobTitle}
        onChangeText={(text) => setJobTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Relevant Skills"
        value={relevantSkills}
        onChangeText={(text) => setRelevantSkills(text)}
      />

      <Text style={styles.sectionTitle}>Availability</Text>
      <TextInput
        style={styles.input}
        placeholder="Days and Hours Available"
        value={daysAndHoursAvailable}
        onChangeText={(text) => setDaysAndHoursAvailable(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Availability to Start Work"
        value={availabilityToStartWork}
        onChangeText={(text) => setAvailabilityToStartWork(text)}
      />

     

     

  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
</ScrollView>
</View>

);
};

const styles = StyleSheet.create({
container: {
padding: 24,
backgroundColor: "#fff",
},
sectionTitle: {
fontSize: 24,
marginBottom: 16,
fontWeight: "600",
},
input: {
height: 40,
borderColor: "#ccc",
borderWidth: 1,
marginBottom: 16,
padding: 8,
},
checkboxText: {
fontSize: 18,
},
consentContainer: {
marginTop: 16,
marginBottom: 32,
},
submitButton: {
backgroundColor: "#333",
padding: 16,
alignItems: "center",
},
submitButtonText: {
color: "#fff",
fontWeight: "600",
fontSize: 18,
},
});

export default AddTeacher;

