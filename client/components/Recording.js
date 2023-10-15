import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Alert } from 'react-native';
import { incrementNumRecording, toggleRecording } from '../features/recording/recordingSlice'; 
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function Reading() {
    const [time, setTime] = useState(0);
    const timerRef = useRef(null);
    const [dataLogs, setDataLogs] = useState([]);
    const [{ x, y, z }, setData] = useState({
      x: 0,
      y: 0,
      z: 0,
    });
    const [subscription, setSubscription] = useState(null);
  
    const _subscribe = () => {
      setSubscription(
        Accelerometer.addListener(accelerometerData => {
          setData(accelerometerData);
          setDataLogs(prevLogs => [
            ...prevLogs,
            `${x},${y},${z},${new Date().toISOString()}`
          ]);
        })
      );
    };

  const exportToCSV = async () => {
    const filename = FileSystem.documentDirectory + 'accelerometer_data.csv';
    const csvContent = 'x,y,z,timestamp\n' + dataLogs.join('\n');
    await FileSystem.writeAsStringAsync(filename, csvContent);
  
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(`Uh oh, sharing isn't available on your platform!`);
      return;
    }
  
    await Sharing.shareAsync(filename);
  };
  

  const _unsubscribe = async () => {
    await exportToCSV();

    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const isRecording = useSelector(state => state.recording.isRecording);
const [seconds, setSeconds] = useState(0);

let timer;
useEffect(() => {
    _subscribe()
    if (isRecording) {
        timer = setInterval(incrementTime, 1000);
    }

    return () => {
        if (timer) {
            clearInterval(timer);
        }
    };
}, []);

const dispatch = useDispatch()
function incrementTime() {
    setSeconds(prevSeconds => {
        if (prevSeconds >= 24) { 
            clearInterval(timer);
            dispatch(incrementNumRecording())
            dispatch(toggleRecording()) 
            _unsubscribe()
            return 25; 
        }
        return prevSeconds + 1;
    });
}



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