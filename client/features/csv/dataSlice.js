import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'data',
    initialState: {
        csv: []
    },
    reducers: {
        setCSV: (state, action) => {
            state.csv = [action.payload];
        }
    }
});

export const { setCSV } = slice.actions
export default slice.reducer;