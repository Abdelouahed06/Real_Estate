import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const fetchAnnounces = createAsyncThunk('annunce/fetchAnnounces', async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/announce/`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchMyAnnounces = createAsyncThunk('annunce/fetchMyAnnounces', async (data) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/announce/my-announces', { userId: data.userId }, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchDeleteAnnounces = createAsyncThunk('annunce/fetchDeleteAnnounces', async (data) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/announce/delete/${data.announceId}`, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchAddAnnounce = createAsyncThunk('announce/fetchAddAnnounce', async (formData, token) => {
    // console.log(formData)
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/announce/add', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchUpdateAnnounce = createAsyncThunk('announce/fetchUpdateAnnounce', async (data) => {
    const { formData, announce_id, token } = data
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/announce/edit/${announce_id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})



const initialState = {
    status: null,
    announces: {},
    myAnnounces: [],
    error: null,
    pageNumber: 1
}

const AnnounceReducer = createSlice({
    name: 'announce',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // get all announces
            .addCase(fetchAnnounces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAnnounces.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.announces = action.payload
            })
            .addCase(fetchAnnounces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            // add new announce
            .addCase(fetchAddAnnounce.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddAnnounce.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.announces = action.payload
                window.location.href = '/'
            })
            .addCase(fetchAddAnnounce.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            // get my announces
            .addCase(fetchMyAnnounces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMyAnnounces.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.myAnnounces = action.payload.myAnnounces
                console.log(state.myAnnounces)
            })
            .addCase(fetchMyAnnounces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            // delete an announce
            .addCase(fetchDeleteAnnounces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteAnnounces.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.myAnnounces = state.myAnnounces.filter(item => item.announce_id != action.payload.announce_id)
                console.log(action.payload)
                // if (action.payload.status === 200) {
                //     window.location.href = '/'
                // }
            })
            .addCase(fetchDeleteAnnounces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

    }
})

export const { changeNumber } = AnnounceReducer.actions
export default AnnounceReducer.reducer