import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import React from 'react';
import AppHeader from '../component/AppHeader';
import AppTextInput from '../component/AppTextInput';
import AppButton from '../component/AppButton';
import ListView from '../component/ListView';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../redux/userSlice';
import { RootState } from '../redux/store'; // Make sure this is the correct path

const MainScreenRedux = () => {
    const [name, setName] = React.useState<string>('');
    const [editModalVisible, setEditModalVisible] = React.useState(false);
    const [editName, setEditName] = React.useState('');
    const [selectedUserId, setSelectedUserId] = React.useState<number | null>(null);

    const users = useSelector((state: RootState) => state.user.users);
    const dispatch = useDispatch();

    function _adduser(): void {
        if (name.trim() === '') {
            Alert.alert('Please enter a name');
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name.trim(),
        };

        dispatch(addUser(newUser));
        setName('');
    }

    const showEditModal = (id: number, currentName: string) => () => {
        setEditModalVisible(true);
        setSelectedUserId(id);
        setEditName(currentName);
    };

    const _editUser = () => {
        if (selectedUserId !== null && editName.trim() !== '') {
            dispatch(updateUser({ id: selectedUserId, name: editName.trim() }));
        }
        setEditModalVisible(false);
        setEditName('');
        setSelectedUserId(null);
    };

    const handleDelete = (userId: number) => {
        dispatch(deleteUser(userId));
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
                    data={users}
                    renderItem={({ item }) => (
                        <ListView
                            title={item.name}
                            onEdit={showEditModal(item.id, item.name)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    )}
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

export default MainScreenRedux;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
