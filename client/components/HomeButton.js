import React, {useEffect} from 'react';
import {Button, View, StyleSheet} from 'react-native'
import { useDispatch } from 'react-redux';
import { setNumRecording } from '../features/recording/recordingSlice';
const HomeButton = ({navigation}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setNumRecording(0))
        }
    }, [])

    handleReturnHome = () => {
        dispatch(setNumRecording(0))
    }
    return (
        <>
            <View style={styles.container}>
                <Button 
                    title={"Return Home"}
                    onPress={navigation.navigate('Instructions')}
                />
        </View>
        
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#0284c7',
        color: '#0284c7',
        borderWidth: 1,      
        borderRadius: 50, 
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default HomeButton;