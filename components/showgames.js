import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator,ScrollView } from 'react-native';
import firebase from '../database/firebase';

class ShowGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.unsubscribe = this.fetchGames();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  fetchGames = () => {
    const currentUser = firebase.auth().currentUser;
    const gamesRef = firebase.firestore().collection('games').where('userId', '==', currentUser.uid);
    return gamesRef.onSnapshot((querySnapshot) => {
      const games = [];
      querySnapshot.forEach((doc) => {
        const { name, description, image, location, type } = doc.data();
        games.push({
          id: doc.id,
          name,
          description,
          image,
          location,
          type
        });
      });
      this.setState({ games, isLoading: false });
    }, (error) => {
      console.error('Error fetching games:', error);
      this.setState({ isLoading: false });
    });
  };

  handleRemoveGame = (id) => {
    Alert.alert(
      "Delete Game",
      "Are you sure you want to delete this game?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            firebase.firestore().collection('games').doc(id).delete()
              .then(() => {
                console.log("Game deleted successfully.");
              })
              .catch((error) => {
                console.error("Error deleting game:", error);
              });
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  renderItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.gameItem}>
      <View style={styles.gameImageContainer}>
        <Image source={{ uri: item.image }} style={styles.gameImage} />
      </View>
      <View style={styles.gameDetails}>
        <Text style={styles.gameName}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Genre: {item.type}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => this.handleRemoveGame(item.id)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );

  render() {
    const { games, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Publications</Text>
        {games.length > 0 ? (
          <FlatList
            data={games}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        ) : (
          <Text style={styles.noGamesText}>No games found.</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF6EC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 30,
   
    marginBottom: 40,
    fontSize: 24,

    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  gameImageContainer: {
    width: 100,
    height: 80,
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  gameDetails: {
    flex: 1,
    marginLeft: 10,
  },
  gameName: {

    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noGamesText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ShowGames;
