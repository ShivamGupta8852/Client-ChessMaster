import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    profileImage: null,
    userName: '',
    email: '',
};

const loggedUserSlice = createSlice({
    name:'loggedUser',
    initialState,
    reducers:{
        login: (state,action) => {
            state.isLoggedIn = action.payload;
        },
        setUser : (state, action) => {
            if(action.payload.profileImage){
                state.profileImage = action.payload.profileImage;
            }
            if(action.payload.userName){
                state.userName = action.payload.userName;
            }
            if(action.payload.email){
                state.email = action.payload.email;
            }
        },
        logout : (state) => {
            state.isLoggedIn = false;
            state.profileImage = null;
            state.userName = '';
            state.email = '';
        },
        updateProfile : (state,action) => {
            if(action.payload.profileImage){
                state.profileImage = action.payload.profileImage;
            }
            if(action.payload.userName){
                state.userName = action.payload.userName;
            }
        }
    }

})

export const {login,setUser,logout,updateProfile} = loggedUserSlice.actions; 
export default loggedUserSlice.reducer;  