import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import data from '../Data/Data.json';

export default function Quiz() {
  const quizData = data;

  const [questions, setQuestions] = useState(quizData.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(59);
  const [showAnswerTimer, setShowAnswerTimer] = useState(false);
  const [answerCountdown, setAnswerCountdown] = useState(4);

  const navigation = useNavigation();
  // 60 seconds timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        moveNextQuestion();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);
  // 5 seconds timer
  useEffect(() => {
    if (showAnswerTimer) {
      const answerTimer = setInterval(() => {
        if (answerCountdown > 0) {
          setAnswerCountdown(answerCountdown - 1);
        } else {
          moveNextQuestion();
        }
      }, 1000);

      return () => {
        clearInterval(answerTimer);
      };
    }
  }, [showAnswerTimer, answerCountdown]);
  // Logic Function
  const moveNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setRemainingTime(59);
      setShowAnswerTimer(false);
      setAnswerCountdown(4);
    } else {
      navigation.navigate('QuizResult', {
        score,
        totalQuestions: questions.length,
      });
    }
  };
  // Onpress Event
  const handleAnswer = answerIndex => {
    setSelectedAnswer(answerIndex);
    setShowAnswerTimer(true);

    if (answerIndex === questions[currentQuestionIndex].answerIndex) {
      setScore(score + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Remaining: {remainingTime} seconds</Text>
      {showAnswerTimer && (
        <Text style={styles.answerTimer}>
          Next Question in: {answerCountdown} seconds
        </Text>
      )}
      <Text style={styles.question}>
        Question {currentQuestionIndex + 1}:
        {questions[currentQuestionIndex].question}
      </Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedAnswer === index && styles.selectedOption,
          ]}
          onPress={() => handleAnswer(index)}
          disabled={selectedAnswer !== null}>
          <Text style={styles.optionNumber}>{index + 1}.</Text>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 16,
    marginBottom: 10,
  },
  answerTimer: {
    fontSize: 16,
    marginBottom: 10,
    color: 'red',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedOption: {
    backgroundColor: 'lightgreen',
  },
  optionNumber: {
    marginRight: 5,
    fontSize: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
});
