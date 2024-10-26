import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const changePassword = createAsyncThunk('user/changePassword', async (data) => {
    const { currentPassword, newPassword, token, userId } = data
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/user/new-password/${userId}`, { currentPassword, newPassword }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchUpdateUser = createAsyncThunk('user/fetchUpdateUser', async (data) => {

    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/user/${data.userId}`, data.userInfo, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

const UserReducer = createSlice({
    name: 'user',
    initialState: {
        status: null,
        user: {},
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get user information
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'faild'
                state.user = action.error.message
            })

            // update user information
            .addCase(fetchUpdateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.status = 'success'
                if (action.payload && action.payload.status === 200) {
                    state.user = action.payload
                    window.location.href = '/'
                }
            })
            .addCase(fetchUpdateUser.rejected, (state, action) => {
                state.status = 'faild'
                state.user = action.error.message
            })

            // update user password
            .addCase(changePassword.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = 'success'
                if (action.payload && action.payload.status === 200) {
                    state.user = action.payload
                    window.location.href = '/setting/profile'
                }
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = 'faild'
                state.user = action.error.message
            })
    }

})

export default UserReducer.reducer