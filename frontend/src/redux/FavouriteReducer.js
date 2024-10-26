import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchMyFavourites = createAsyncThunk('favourite/fetchMyFavourites', async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/favourite/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const fetchRemoveFromMyFavourite = createAsyncThunk('favourite/fetchRemoveFromMyFavourite', async (formData) => {
    try {
        const { announce_id, token } = formData;
        console.log(token)
        const response = await axios.delete(`http://127.0.0.1:8000/api/favourite/${announce_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.announce_id
    } catch (err) {
        console.log(err)
    }
})

export const getAnnouneDetails = createAsyncThunk('favourite/getAnnouneDetails', async (formData) => {
    try {
        const { announce_id, token } = formData;
        console.log(token)
        const response = await axios.get(`http://127.0.0.1:8000/api/favourite/${announce_id}`, {
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

export const fetchAddToFavourite = createAsyncThunk('favourite/fetchAddToFavourite', async (formData) => {
    
    const {announce_id, token} = formData

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/favourite/add', {announce_id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
})



const initialState = {
    status: null,
    favourites: [],
    announce: {},
    error: null
}

const FavouriteReducer = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // get all announces
            .addCase(fetchMyFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMyFavourites.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favourites = action.payload.favourites
            })
            .addCase(fetchMyFavourites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })  

            // remove from favourite
            .addCase(fetchRemoveFromMyFavourite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRemoveFromMyFavourite.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favourites = state.favourites.filter(item => item.announce_id != action.payload)
            })
            .addCase(fetchRemoveFromMyFavourite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            // get announce details
            .addCase(getAnnouneDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAnnouneDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.announce = action.payload
            })
            .addCase(getAnnouneDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

             // add new announce
             .addCase(fetchAddToFavourite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddToFavourite.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(fetchAddToFavourite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

           
    }
})

export default FavouriteReducer.reducer