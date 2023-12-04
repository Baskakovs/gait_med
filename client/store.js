import { configureStore } from '@reduxjs/toolkit';
import recordingReducer from './features/recording/recordingSlice.js'
import loggingReducer from './features/logging/loggingSlice.js'
import dataReducer from './features/csv/dataSlice.js' 

const store = configureStore({
    reducer: {
        recording: recordingReducer,
        logging: loggingReducer,
        data: dataReducer
    }
});

export default store;
