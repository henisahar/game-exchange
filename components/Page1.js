import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, Alert, ScrollView, Image,TouchableOpacity } from 'react-native';
import firebase from '../database/firebase'; 
import Icon from 'react-native-vector-icons/Entypo';

const loginImage = require('../images/profile.jpg');

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      isLoading: true,
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(firebase.auth().currentUser.uid);
      const docSnapshot = await userRef.get();

      if (docSnapshot.exists) {
        // If the document exists, update the state with user data
        const userData = docSnapshot.data();
        this.setState({ userData, isLoading: false });
      } else {
        this.setState({ isLoading: false, errorMessage: "User data not found" });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.setState({ isLoading: false, errorMessage: error.message });
    }
  };

  handleDeleteAccount = () => {
    const user = firebase.auth().currentUser;
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            user.delete().then(() => {
              console.log("Account deleted successfully.");
            }).catch((error) => {
              console.error("Error deleting account:", error);
              Alert.alert("Error", "Failed to delete account. Please try again later.");
            });
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { userData, isLoading, errorMessage } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (errorMessage) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground source={loginImage} style={styles.backgroundImage}>
          <View style={styles.profileContainer}>
            {userData && (
              <View style={styles.profileImageContainer}>
                {userData.imageUrl && (
                  <Image
                    source={{ uri: userData.imageUrl }}
                    style={styles.profileImage}
                  />
                )}
              </View>
            )}
            <Text style={styles.username}>{userData.displayName}</Text>
            <View style={styles.userInfooContainer}>
              <Icon name="location-pin" size={30} />
              <Text style={styles.userState}>{userData.userState}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.userInfoList}>
              <View style={styles.userInfoContainer}>
                <Icon name="email" size={30} />
                <Text style={styles.userInfo}>{userData.email}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Icon name="phone" size={30} />
                <Text style={styles.userInfo}>{userData.phoneNumber}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Icon name="heart" size={30} />
                <Text style={styles.userInfo}>{userData.selectedGames}</Text>
              </View>
            </View>
            <TouchableOpacity 
  style={styles.deleteButton}
  onPress={this.handleDeleteAccount}
>
  <Text style={styles.deleteButtonText}>Delete Account</Text>
</TouchableOpacity>

          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'underline',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    marginTop: -100,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 3,
  },
  userInfooContainer: {
    flexDirection: 'row',
   
    marginBottom: 30,
    marginTop:3,
  },
  userState:{
    fontSize: 20,
    marginLeft: 10,
  },
  userInfo: {
    fontSize: 20,
    marginLeft: 10,
  
  },
  username: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    backgroundColor: '#BA68C8',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center', 
  },
  deleteButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white', 
  },
  
});

export default Page1;
