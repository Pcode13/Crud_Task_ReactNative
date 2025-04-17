import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AppHeader:React.FC= () => {
  return (
    <View style={{}}>
      <Text style={styles.text}>CRUD </Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
    text:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#7556db',

    },
    headerView:{
        marginHorizontal: 16,
        marginVertical: 20,
         backgroundColor: '#f0f0f0',
         
    },
});
