import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import firebase from '../database/firebase';
import { Picker } from '@react-native-picker/picker'; 

class ShowAllGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      isLoading: true,
      filterName: '',
      filterGenre: '',
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
    const gamesRef = firebase.firestore().collection('games');
    return gamesRef.onSnapshot((querySnapshot) => {
      const games = [];
      querySnapshot.forEach((doc) => {
        const { name, description, image, location, genre, phoneNumber } = doc.data();
        games.push({
          id: doc.id,
          name,
          description,
          image,
          location,
          genre,
          phoneNumber
        });
      });
      this.setState({ games, isLoading: false });
    }, (error) => {
      console.error('Error fetching games:', error);
      this.setState({ isLoading: false });
    });
  };

  handleSeeMore = (game) => {
    this.props.navigation.navigate('GameDetails', { gameId: game.id });
  };
  

  handleFilterNameChange = (text) => {
    this.setState({ filterName: text });
  };

  handleFilterGenreChange = (value) => {
    this.setState({ filterGenre: value });
  };

  renderGameItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.gameItem} onPress={() => this.handleSeeMore(item)}>
      <View style={styles.gameImageContainer}>
        <Image source={{ uri: item.image }} style={styles.gameImage} />
      </View>
      <View style={styles.gameDetails}>
        <Text style={styles.gameName}>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { games, isLoading, filterName, filterGenre } = this.state;

    let filteredGames = games.filter(game => {
      return game.name.toLowerCase().includes(filterName.toLowerCase()) &&
             (filterGenre === '' || game.genre === filterGenre);
    });

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Let's see what we have</Text>
        <View style={styles.filters}>
          <TextInput
            style={styles.filterInput}
            placeholder="Filter by name"
            value={filterName}
            onChangeText={this.handleFilterNameChange}
          />
          <Picker
            style={styles.filterPicker}
            selectedValue={filterGenre}
            onValueChange={this.handleFilterGenreChange}>
            <Picker.Item label="Filter by genre" value="" />
            <Picker.Item label="Action" value="action" />
            <Picker.Item label="video_games" value="video_games" />
            <Picker.Item label="carte" value="carte" />
            {/* Add more genres as needed */}
          </Picker>
        </View>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => this.renderGameItem(game))
        ) : (
          <Text style={styles.noGamesText}>No games found.</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  filterInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  filterPicker: {
    width: 150,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
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
  noGamesText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ShowAllGames;
