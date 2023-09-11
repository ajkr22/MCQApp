// Home.js

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const startQuiz = () => {
    // Navigate to the Quiz screen when the user starts the quiz
    navigation.navigate('Quiz');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Quiz App</Text>
      <TouchableOpacity onPress={startQuiz} style={styles.startButton}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
