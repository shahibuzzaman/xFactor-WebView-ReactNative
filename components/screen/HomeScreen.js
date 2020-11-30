import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Image, Alert} from 'react-native';
import WebPage from './WebPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState({
    pin: '',
  });
  const [isLoadong, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const nameInputChange = (value) => {
    if (value.length != 0) {
      setData({
        ...data,
        pin: value,
      });
    } else {
      setData({
        ...data,
        pin: '',
      });
    }
  };

  console.log(data.pin);

  const storePin = async () => {
    try {
      await AsyncStorage.setItem('pin', data.pin);
    } catch (e) {
      // saving error
    }
  };

  const loginAction = async () => {
    try {
      await fetch('http://unisoft.clonestudiobd.com/api/redirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          pin: data.pin,
        }),
      }).then((response) => {
        const getStatus = response.status;
        console.log(getStatus);

        if (getStatus === 200) {
          response
            .json()
            .then((result) => {
              setUrl(result);
            })
            .catch((error) => {
              console.error(error);
            });
          storePin();
        } else {
          Alert.alert(
            'Invalid Pin!',
            '',
            [
              {
                text: 'OK',
                onPress: () => {
                  setData({
                    pin: '',
                  }),
                    console.log('OK Pressed');
                },
              },
            ],
            {cancelable: false},
          );
        }
      });
    } catch (e) {}
  };

  const loginEffect = async (value) => {
    try {
      await fetch('http://unisoft.clonestudiobd.com/api/redirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          pin: value,
        }),
      }).then((response) => {
        response
          .json()
          .then((result) => {
            setUrl(result);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    } catch (e) {}
  };

  console.log('url', url);

  const loginData = async () => {
    try {
      let value = await AsyncStorage.getItem('pin');

      console.log('pin', value);

      if (value !== null) {
        loginEffect(value);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loginData();
  }, []);

  if (url === '') {
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
          source={require('../asset/logo.png')}
        />
        <TextInput
          placeholder="Your Pin"
          textAlign={'center'}
          keyboardType="numeric"
          style={{
            backgroundColor: 'white',
            fontSize: 20,
            height: 55,
            width: '50%',
            marginBottom: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'grey',
          }}
          onChangeText={(value) => nameInputChange(value)}
        />
        <View style={{width: '50%'}}>
          <Button
            color="#8b0000"
            title="Sign In"
            onPress={() => {
              data.pin
                ? loginAction()
                : Alert.alert(
                    'Invalid Pin',
                    '',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <WebPage navigation={navigation} url={url} />
      </View>
    );
  }
};

export default HomeScreen;
