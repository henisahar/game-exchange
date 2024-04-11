import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebase from '../database/firebase';
import { getFirestore, collection, addDoc, updateDoc, doc, firestore } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      phoneNumber: '',
      imageUri: null,
      selectedGames: [], // Initially empty array for selected games
      userState: '', // New state variable to hold the user's state
      isLoading: false
    };
    this.storage = getStorage();
  }

  updateInputVal = (val, prop) => {
    if (prop === 'selectedGames') {
      this.setState((prevState) => ({
        [prop]: [...prevState.selectedGames, val], // Add the selected game to the array
      }));
    } else {
      this.setState({ [prop]: val });
    }
  };

  handleImagePicker = async () => {
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
        this.setState({ imageUri: result.uri });
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  saveUserDataToFirestore = async (userId, userData) => {
    try {
      const db = firebase.firestore();
      const userRef = db.collection('users');
      await userRef.doc(userId).set(userData);
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  handleSignUp = async () => {
    const { email, password, displayName, phoneNumber, imageUri, selectedGames, userState } = this.state;
    const trimmedEmail = email.trim();
    try {
      this.setState({ isLoading: true });

      const userCredential = await firebase.auth().createUserWithEmailAndPassword(trimmedEmail, password);
      const user = userCredential.user;

      if (user) {
        const imageUrl = await this.uploadImageToStorage(imageUri, user.uid);

        const userData = {
          displayName: displayName,
          email: trimmedEmail,
          phoneNumber: phoneNumber,
          imageUrl: imageUrl,
          selectedGames: selectedGames,
          userState: userState, // Include user's state in the userData
        };

        await this.saveUserDataToFirestore(user.uid, userData);

        console.log('User registered successfully!');
        console.log('User Data:', userData);

        this.setState({ isLoading: false, displayName: '', email: '', password: '', phoneNumber: '', imageUri: null, userState: '', selectedGames: [] });
        this.props.navigation.navigate('Login');
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      this.setState({ isLoading: false, errorMessage: error.message });
    }
  };


  uploadImageToStorage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(this.storage, 'user-profile-images/' + firebase.auth().currentUser.uid);
    const snapshot = await uploadBytes(storageRef, blob);
    return getDownloadURL(snapshot.ref);
  };

  render() {
    const { imageUri, selectedGames } = this.state;

    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Button
              title="Select Profile Image"
              onPress={this.handleImagePicker}
            />
          )}
        </View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={this.state.phoneNumber}
          onChangeText={(val) => this.updateInputVal(val, 'phoneNumber')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="State"
          value={this.state.userState}
          onChangeText={(val) => this.updateInputVal(val, 'userState')} 
        />
        <View style={styles.inputStyle}>
          <Text>Choose your favorite type of games </Text>
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
        <Button
          color="#3740FE"
          title=" Signup"
          icon={<Icon name="md-person-add" size={15} color="white" />}
          onPress={() => this.handleSignUp()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
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
  }
});
