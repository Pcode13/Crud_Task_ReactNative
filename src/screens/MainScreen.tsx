import { FlatList, SafeAreaView, StyleSheet,Alert ,View, TouchableOpacity, Text, Modal,TextInput } from 'react-native';
import React from 'react';
import AppHeader from '../component/AppHeader';
import AppTextInput from '../component/AppTextInput';
import AppButton from '../component/AppButton';
import ListView from '../component/ListView';

const MainScreen = () => {
  const [name, setName] = React.useState<string>('');
  const [data, setData] = React.useState<any[]>([]);

  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editName, setEditName] = React.useState('');
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null);


  function _adduser(): void {
    if (name.trim() === '') {
      Alert.alert('Please enter a name');
      return;
    }

    const newUser = {
      id: Date.now(), // unique ID
      name: name.trim(),
    };

    setData((prevData) => [...prevData, newUser]);
    setName('');
  }

  function _deleteUser(id: number): () => void {
    return () => {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    };
  }



  const showEditModal = (id: number, currentName: string) => () => {
    setSelectedUserId(id);
    setEditName(currentName);
    setEditModalVisible(true);
  };

  const _editUser = () => {
    if(selectedUserId !== null){
      setData((prevData) =>
        prevData.map((item)=>
        item.id === selectedUserId ? {...item,name:editName} : item)
      );
    }
    setEditModalVisible(false);
    setEditName('');
    setSelectedUserId(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', margin: 16 }}>
      <AppHeader />
      <View style={{ marginVertical: 20 }}>
        <AppTextInput
          placeholder={'Enter your name'}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <AppButton title={'Add'} onPress={_adduser} />
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <ListView
                title={item.name}
                onEdit={showEditModal(item.id, item.name)}
                onDelete={_deleteUser(item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />

      </View>
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit User</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter new name"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={_editUser} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#42f595',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});


