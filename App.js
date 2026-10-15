import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/theme';

import ListaSensoresScreen from './src/screens/ListaSensoresScreen';
import DetalhesSensorScreen from './src/screens/DetalhesSensorScreen';
import AtualizarStatusScreen from './src/screens/AtualizarStatusScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={theme.colors.background} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Stack.Screen 
          name="ListaSensores" 
          component={ListaSensoresScreen} 
          options={{ title: 'Sensores Conectados' }}
        />
        <Stack.Screen 
          name="DetalhesSensor" 
          component={DetalhesSensorScreen} 
          options={{ title: 'Ficha do Sensor' }}
        />
        <Stack.Screen 
          name="AtualizarStatus" 
          component={AtualizarStatusScreen} 
          options={{ title: 'Gerenciar Estado' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}