import React from 'react';
import {View, Text} from 'react-native';

const LocationMapping = ({navigation, route}) => {
  console.log('@@@@@@@ : ', route.params);

  return (
    <View>
      <Text>
        Hello World
      </Text>
    </View>
  );
};

export default LocationMapping;
