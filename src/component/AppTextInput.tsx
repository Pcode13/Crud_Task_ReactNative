import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';

interface AppTextInputProps extends React.ComponentProps<typeof TextInput> {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const AppTextInput:React.FC<AppTextInputProps> = ({ placeholder, value,onChangeText,...rest}) => {
    return (
        <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#555"
          keyboardType="default"
          value={value}
          onChangeText={onChangeText}
          {...rest} // Spread any other optional props
        />
      </View>
    );
};

export default AppTextInput;

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
});
