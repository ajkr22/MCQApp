import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function QuizResult({route}) {
  const {score, totalQuestions} = route.params;
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Quiz completed!</Text>
      <Text style={styles.scoreText}>
        Total Correct: {score}/{totalQuestions}
      </Text>
      <Button title="Go to Home" onPress={goToHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
  },
});
