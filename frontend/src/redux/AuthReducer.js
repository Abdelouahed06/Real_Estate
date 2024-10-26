import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (userInfo) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', userInfo)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (userInfo) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', userInfo)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    async (token) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/logout', {} ,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.log(err)
        }
    }
);



const AuthReducer = createSlice({
    name: 'auth',
    initialState: {
        status: null,
        response: {},
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // register cases
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.response = action.payload
                state.status = 'success'
                if (state.response.token) {
                    localStorage.setItem('token', JSON.stringify(action.payload.token))
                }
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = 'faild'
                state.error = action.error.message
            })

            // login cases
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.response = action.payload
                state.status = 'success'
                if (state.response.token) {
                    localStorage.setItem('token', JSON.stringify(action.payload.token))
                }
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = 'faild'
                state.error = action.error.message
            })
            
            // Logout cases
            .addCase(fetchLogout.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.status = 'success'
                localStorage.removeItem('token')
                window.location.href = '/';
            })
            .addCase(fetchLogout.rejected, (state, action) => {
                state.status = 'faild'
                state.error = action.error.message
            })
    }
})

export default AuthReducer.reducer