import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';


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
      <View style={styles.circleContainer}>
        <View style={[styles.circle1, { top: -6, left: 20 }]} />
        <View style={[styles.circle2, { top: 70, right: 10 }]} />
        <View style={[styles.circle3, { top: 120, left: 40 }]} />
        <View style={[styles.circle4, { top: 180, right: 20 }]} />
        <View style={[styles.circle5, { top: 30, left: 140 }]} />
        <View style={[styles.circle6, { top: 10, right: 100 }]} />
        <View style={[styles.circle7, { top: 170, right: 130 }]} />
      </View>
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
    backgroundColor: '#FDF6EC',
  },
  circleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  circle1: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C2A7D8',
    position: 'absolute',
  },
  circle2: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#EBC8F0',
    position: 'absolute',
  },
  circle3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5CB287',
    position: 'absolute',
  },
  circle4: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ECBE5C',
    position: 'absolute',
  },
  circle5: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#EC6161',
    position: 'absolute',
  },
  circle6: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#ADBEF8',
    position: 'absolute',
  },
  circle7: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#A70D32',
    position: 'absolute',
  },
  title: {
    fontFamily: 'System', // Use system font
    fontSize: 16,

   
    fontSize: 35,
    color: '#BA68C8',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 40,
    margin: 40,

  },
  boxContainer: {
    flexDirection: 'column',
    marginTop: 100,
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
