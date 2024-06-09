import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import { NoteProvider } from '../context/NoteContext';

const Stack = createStackNavigator();

const NoteTakingAppNavigation = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <NoteProvider>
      <PaperProvider theme={isDarkTheme ? DarkTheme : DefaultTheme} toggleTheme={setIsDarkTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NoteProvider>
  );
};

export default NoteTakingAppNavigation;
