import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'logging',
    initialState: {
        message: ""
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    }
});

export const { setMessage } = slice.actions
export default slice.reducer;