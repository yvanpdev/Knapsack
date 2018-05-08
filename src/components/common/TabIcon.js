import React from 'react';
import { Text, View } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = (props) => {
  return (
    <View>
    {/* TODO: display icon image here (need to import from an icons library) */ }
    <Text style={{ color: props.focused ? 'white' : 'black' }}>{props.title}</Text>
    </View>
  );
};
export { TabIcon };
