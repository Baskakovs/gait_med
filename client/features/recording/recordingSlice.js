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
        }
    }
});

const { toggleRecording, incrementNumRecording } = slice.actions;
export { toggleRecording, incrementNumRecording };
export default slice.reducer;