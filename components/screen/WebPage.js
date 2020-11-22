import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

const WebPage = ({navigation, url}) => {
  const [isLoadong, setLoading] = useState(false);

  console.log(url);

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{uri: `${url}`}}
        onLoadStart={(syntheticEvent) => {
          setLoading(true);
        }}
        onLoadEnd={(syntheticEvent) => {
          setLoading(false);
        }}
      />
      {isLoadong && (
        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator color="#8b0000" size="large" />
        </View>
      )}
    </View>
  );
};

export default WebPage;
