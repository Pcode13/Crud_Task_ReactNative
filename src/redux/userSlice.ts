import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../redux/types/userTypes'; // Ensure the file '../types/userTypes.ts' exists or update the path

interface UserState {
    users: User[];

}

const initialState:UserState = {
    users: [],
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<User>)=>{
state.users.unshift(action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
              state.users[index] = action.payload;
            }
          },
          deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
          },
    },
});

export const {addUser,updateUser,deleteUser

} = userSlice.actions;
export default userSlice.reducer;
