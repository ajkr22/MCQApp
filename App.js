import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Quiz from './src/Screens/Quiz';

import QuizResult from './src/Screens/QuizResult';
import Home from './src/Screens/Home';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />


        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="QuizResult" component={QuizResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
