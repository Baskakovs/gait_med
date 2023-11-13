import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { incrementNumRecording, toggleRecording } from '../features/recording/recordingSlice'; 
import { Accelerometer } from 'expo-sensors';

import { setMessage } from '../features/logging/loggingSlice';
import { setCSV } from '../features/csv/data';

export default function Reading() {
    const dispatch = useDispatch();
    const isRecording = useSelector(state => state.recording.isRecording);
    const [dataLogs, setDataLogs] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [seconds, setSeconds] = useState(0);

    const _subscribe = () => {
        const sub = Accelerometer.addListener(accelerometerData => {
            setDataLogs(prevLogs => [
                ...prevLogs, 
                `${accelerometerData.x},${accelerometerData.y},${accelerometerData.z},${new Date().toISOString()}`
            ]);
        });
        setSubscription(sub);
    };

    const _unsubscribe = () => {
        if (subscription) {
            subscription.remove();
            setSubscription(null);
        }
    };

    const exportToCSV = () => {
        const csv = dataLogs.join('\n');
        // Example action to set CSV data
        dispatch(setCSV(csv));
        // For logging purposeOk 
        dispatch(setMessage(dataLogs));
    };

    useEffect(() => {
        let timer;

        if (isRecording) {
            _subscribe();
            timer = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 3) {
                        clearInterval(timer);
                        return prevSeconds;
                    }
                    return prevSeconds + 1;
                });
            }, 1000);
        } else {
            clearInterval(timer);
            _unsubscribe();
        }

        // Clean-up function
        return () => {
            clearInterval(timer);
            _unsubscribe();
        };
    }, [isRecording]);

    useEffect(() => {
        if (seconds === 3) {
            exportToCSV();
            dispatch(incrementNumRecording());
            dispatch(toggleRecording());
        }
    }, [seconds, dataLogs, dispatch]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{seconds}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    letterSpacing: 1,
    fontSize: 222,
    color:  "#333333",
    fontWeight: 600,
    textAlign: 'center',
  },
  logText:{
    letterSpacing: 1,
    fontSize: 40,
    color:  "#333333",
    fontWeight: 600,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
});