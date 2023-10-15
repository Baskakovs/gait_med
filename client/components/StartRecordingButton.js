import React from 'react';
import {Button, View, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux'
import { toggleRecording } from '../features/recording/recordingSlice';

const StartRecordingButton = () => {
    const dispatch = useDispatch()
    function handleStartRecording(){
        dispatch(toggleRecording())
    }
    return (
        <View style={styles.container}>
            <Button 
            title={"Start Recording"}
            onPress={handleStartRecording} 
            color={'white'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        color: '#FFF',
        backgroundColor: '#0284c7',
        borderRadius: 50,
        width: '90%',
        height: 50,
        justifyContent: 'center',
    },
})

export default StartRecordingButton;