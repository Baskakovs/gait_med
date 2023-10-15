import { configureStore } from '@reduxjs/toolkit';
import recordingReducer from './features/recording/recordingSlice.js'

const store = configureStore({
    reducer: {
        recording: recordingReducer
    }
});

export default store;
