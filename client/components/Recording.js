import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { incrementNumRecording, toggleRecording } from '../features/recording/recordingSlice'; 
import { Accelerometer, Gyroscope } from 'expo-sensors';

import { setMessage } from '../features/logging/loggingSlice';
import { setCSV } from '../features/csv/dataSlice';

export default function Reading() {
    const dispatch = useDispatch();
    const isRecording = useSelector(state => state.recording.isRecording);
    const [dataLogs, setDataLogs] = useState([]);
    const [subscriptions, setSubscriptions] = useState({ accel: null, gyro: null });
    const [seconds, setSeconds] = useState(0);

    const _subscribe = () => {
        let accelData = 0;
        let gyroData = 0;
    
        const accelSub = Accelerometer.addListener(accelerometerData => {
            accelData = accelerometerData; 
            updateDataLogs(accelData, gyroData);
        });
    
        const gyroSub = Gyroscope.addListener(gyroscopeData => {
            gyroData = gyroscopeData; 
            updateDataLogs(accelData, gyroData); 
        });
    
        setSubscriptions({ accel: accelSub, gyro: gyroSub });
    };

    const generateSeconds = () => {
        const date = new Date();
        const miliSeconds = date.getMilliseconds();
        const seconds = miliSeconds / 10000;
        return seconds;
    };
    
    const updateDataLogs = (accelerometerData, gyroscopeData) => {
        let seconds = generateSeconds();
        if(
            accelerometerData.x === undefined || accelerometerData.y === undefined || accelerometerData.z === undefined ||
            gyroscopeData.x === undefined || gyroscopeData.y === undefined || gyroscopeData.z === undefined
        ) return;
        setDataLogs(prevLogs => [
            ...prevLogs,
            `${accelerometerData.x},${accelerometerData.y},${accelerometerData.z},` +
            `${gyroscopeData.x},${gyroscopeData.y},${gyroscopeData.z},` +
            `${seconds}`
        ]);
    };

    const _unsubscribe = () => {
        if (subscriptions.accel) {
            subscriptions.accel.remove();
        }
        if (subscriptions.gyro) {
            subscriptions.gyro.remove();
        }
    };

    const exportToCSV = () => {
        const csv = dataLogs.join('\n');
        dispatch(setCSV(csv));
        // dispatch(setMessage(dataLogs));
    };

    useEffect(() => {
        if (isRecording) {
            _subscribe();
        } else {
            _unsubscribe();
        }
    }
    , [isRecording]);

    useEffect(() => {
        if (isRecording) {
            const timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }
    , [isRecording]);

    useEffect(() => {
        if (seconds === 2) {
            _unsubscribe();
            exportToCSV();
            dispatch(toggleRecording());
            dispatch(incrementNumRecording());
        }
    }
    , [seconds]);


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