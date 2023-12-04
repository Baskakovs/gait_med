import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'recording',
    initialState: {
        isRecording: false,
        numRecording: 0
    },
    reducers: {
        toggleRecording: state => {
            state.isRecording = !state.isRecording;
        },
        incrementNumRecording: state => {
            state.numRecording =+ 1
        },
        setNumRecording: (state, action) => {
            state.numRecording = action.payload
        }
    }
});

const { toggleRecording, incrementNumRecording, setNumRecording } = slice.actions;
export { toggleRecording, incrementNumRecording, setNumRecording };
export default slice.reducer;