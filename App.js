import React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/screen/HomeScreen';
import WebPage from './components/screen/WebPage';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Home');
  }, 3000);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        style={{height: 120, width: 200}}
        source={require('./components/asset/logo.png')}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash Screen">
        <Stack.Screen
          name="Splash Screen"
          component={SplashScreen}
          options={({navigation}) => ({
            title: '',
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: '',
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Web"
          component={WebPage}
          options={({navigation}) => ({
            title: '',
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
