import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Screen1 = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Page1');
  };

  const navigateToAddGame = () => {
    navigation.navigate('AddGame');
  };

  const navigateToMyPub = () => {
    navigation.navigate('ShowGames');
  };

  const navigateToPub = () => {
    navigation.navigate('ShowAllGames');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Exchange Games</Text>

      <View style={styles.boxContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={navigateToProfile}>
            <Image source={require('../images/picture.jpg')} style={[styles.boxImage, styles.smallerImage]} />
            <Text style={[styles.boxTitle, styles.titleBorder]}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={navigateToAddGame}>
            <Image source={require('../images/game.png')} style={styles.boxImage} />
            <Text style={[styles.boxTitle, styles.titleBorder]}>Add Game</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.biggerBox} onPress={navigateToMyPub}>
            <Image source={require('../images/mine.jpg')} style={styles.biggerBoxImage} />
            <Text style={[styles.boxTitle, styles.titleBorder]}>My Games</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.biggerBox} onPress={navigateToPub}>
            <Image source={require('../images/games.jpg')} style={styles.biggerBoxImage} />
            <Text style={[styles.boxTitle, styles.titleBorder]}>All Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#5856D6',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 40,
    margin: 40,
  },
  boxContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  box: {
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  smallerImage: {
    height: 100,
    width: 65,
  },
  biggerBox: {
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  boxImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  biggerBoxImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleBorder: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
});

export default Screen1;
