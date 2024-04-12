import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator,TouchableOpacity,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../database/firebase';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import RNPickerSelect from 'react-native-picker-select';



const uploadImageAsync = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

 
  const storageRef = ref(getStorage(), `images/${Date.now()}`);

 
  const snapshot = await uploadBytes(storageRef, blob);

  
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};

export default class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: null,
      isLoading: false,
      selectedGames: null ,
      location:'',
 
    };
    
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  handleAddGame = async () => {
    if (this.state.name === '' || this.state.description === '' || this.state.image === null || this.state.selectedGames === null) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      this.setState({ isLoading: true });
     
      const imageUrl = await uploadImageAsync(this.state.image);
  
      const currentUser = firebase.auth().currentUser;
      await firebase.firestore().collection('games').add({
        name: this.state.name,
        description: this.state.description,
        image: imageUrl,
        type: this.state.selectedGames,
        userId: currentUser.uid, 
        location: this.state.location, 
      });
      
      Alert.alert('Success', 'Game added successfully');
      this.setState({ 
        name: '', 
        description: '', 
        image: null,
        selectedGames: null, 
        location: '', 
        isLoading: false 
      });
    } catch (error) {
      console.error('Error adding game:', error);
      Alert.alert('Error', 'Failed to add game');
      this.setState({ isLoading: false });
    }
  };
  
  

  handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
       
        if (result.assets && result.assets.length > 0) {
        
          const selectedAsset = result.assets[0];
          this.setState({ image: selectedAsset.uri });
        } else {
          console.warn('No asset selected');
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
         {this.state.image && <Image source={{ uri: this.state.image }} style={styles.image} />}
         <TouchableOpacity 
  style={styles.chooseImageButton}
  onPress={this.handleImageUpload}
>
  <Icon name="md-image" size={15} color="white" />
  <Text style={styles.chooseImageText}>Choose Image</Text>
</TouchableOpacity>

       
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.name}
          onChangeText={(val) => this.updateInputVal(val, 'name')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Description"
          value={this.state.description}
          onChangeText={(val) => this.updateInputVal(val, 'description')}
        />
        <View style={styles.inputStyle}>
          <Text>Choose the type of the game </Text>
          <RNPickerSelect
            placeholder={{ label: 'Select a game type', value: null }} 
            onValueChange={(value) => this.updateInputVal(value, 'selectedGames')} 
            items={[
              { label: 'action', value: 'action' },
              { label: 'carte', value: 'carte' },
              { label: 'video_games', value: 'video_games' },
            ]}
          />
        </View>
        <TextInput
  style={styles.inputStyle}
  placeholder="Location"
  value={this.state.location}
  onChangeText={(val) => this.updateInputVal(val, 'location')}
/>

        <TouchableOpacity 
  style={styles.addButton}
  onPress={this.handleAddGame}
>
  <Text style={styles.addButtonText}>Add Game</Text>
</TouchableOpacity>

      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff',
    marginTop: -40,
    backgroundColor: '#FDF6EC',
  },
  inputStyle: {
    marginTop: 20,
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: 300,
    height: 130,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#BA68C8', 
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center', 
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  chooseImageButton: {
    backgroundColor: '#D2798F', 
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  chooseImageText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10, 
    color: 'white', 
  },
  
  
});
