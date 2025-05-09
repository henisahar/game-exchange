import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import firebase from '../database/firebase';

export default class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchGameDetails();
  }
  

  fetchGameDetails = async () => {
    try {
      const gameId = this.props.route.params.gameId;
      const gameRef = firebase.firestore().collection('games').doc(gameId);
      const gameSnapshot = await gameRef.get();
  
      if (gameSnapshot.exists) {
        const gameData = gameSnapshot.data();
        const userId = gameData.userId;
  
       
        const userRef = firebase.firestore().collection('users').doc(userId);
        const userSnapshot = await userRef.get();
  
        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          gameData.phoneNumber = userData.phoneNumber;
          gameData.email = userData.email;
        }
  
        this.setState({ game: gameData, isLoading: false });
      } else {
        console.log('Game not found.');
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching game details:', error);
      this.setState({ isLoading: false });
    }
  };

  handlePhoneNumberPress = () => {
    const { game } = this.state;
    if (game && game.phoneNumber) {
      Linking.openURL(`tel:${game.phoneNumber}`);
    }
  };
  
  render() {
    const { game, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {game ? (
          <View style={styles.gameContainer}>
            <Image source={{ uri: game.image }} style={styles.gameImage} />
            <Text style={styles.gameName}>{game.name}</Text>
            <Text  style={styles.email}>{game.description}</Text>
            <Text  style={styles.email}><Text style={styles.coloredText}>Location:</Text> {game.location}</Text>
            <Text  style={styles.email}><Text style={styles.coloredText}>Genre:</Text> {game.type}</Text>
            <TouchableOpacity onPress={this.handlePhoneNumberPress}>
              <Text style={styles.phoneNumber}><Text style={styles.coloredText}>Phone Number:</Text> {game.phoneNumber}</Text>
            </TouchableOpacity>
            <Text style={styles.email}><Text style={styles.coloredText}>User Email:</Text> {game.email}</Text>
          </View>
        ) : (
          <Text style={styles.noGameDataText}>No game data found.</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF6EC',
  },
  loadingContainer: {
    backgroundColor: '#fff',
  },
  gameContainer: {
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  gameImage: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop: -200,
  },
  gameName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#D70404', 
    textAlign: 'center', 
    textDecorationLine: 'underline',
  },
  gameDetails: {
    alignSelf: 'flex-start',
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
    textDecorationLine: 'underline',
  },
  email: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    color: '#000', 
  },
  coloredText: {
    color: '#ECBE5C', 
  },
  noGameDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
