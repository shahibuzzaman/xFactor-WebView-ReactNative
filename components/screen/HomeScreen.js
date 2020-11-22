import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Image, Alert} from 'react-native';
import WebPage from './WebPage';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState({
    pin: '',
  });
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

  const loginAction = () => {
    fetch('http://unisoft.clonestudiobd.com/api/redirect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        pin: data.pin,
      }),
    }).then((response) => {
      response.json().then((result) => {
        setUrl(result[0].url);
      });
    });
  };

  console.log('url', url);

  if (url != '') {
    return (
      <View style={{flex: 1}}>
        <WebPage navigation={navigation} url={url} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {/* <TextInput
          autoFocus={true}
          keyboardType="numeric"
          onChangeText={(text) => setPin(text)}
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
        /> */}
        <Image
          style={{height: 120, width: 200}}
          source={require('../asset/logo.png')}
        />
        <TextInput
          placeholder="Your Pin"
          autoFocus={true}
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
  }
};

export default HomeScreen;
