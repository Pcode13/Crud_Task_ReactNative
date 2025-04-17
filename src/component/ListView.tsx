import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface ListViewProps {
    title: string;
    onEdit: () => void;
    onDelete: () => void;
}

const ListView:React.FC<ListViewProps> = ({title,onDelete,onEdit}) => {
  return (
    <View style={styles.listview}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onEdit}>
          <Icon name="edit" size={24} color="#007bff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="delete" size={24} color="#ff4d4d" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
    listview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'space-between',
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        flex: 1,
      },
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginLeft: 12,
      },
});
