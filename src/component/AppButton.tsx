import {  Text, TouchableOpacity,StyleSheet } from 'react-native';
import React from 'react';

interface AppButtonProps  {
    title: string;
    onPress: () => void;
}


const AppButton:React.FC<AppButtonProps> = ({title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#7556db',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

