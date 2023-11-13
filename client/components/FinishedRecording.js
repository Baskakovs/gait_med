import React from 'react';
import {Text, Image, View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const FinishedRecording = () => {

    const message = useSelector(state =>state.logging.message)
    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/uploadcsv_illustration.png')}
            style={styles.image}
            />
            <Text style={styles.text}>{message}</Text>
<Text style={styles.text}>
    Now upload your csv to our website to receive a diagnosis
</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFDF7',
        marginVertical: 50
    },
    image: {
        width: Dimensions.get('window').width,
        height: 0.55 * Dimensions.get('window').height,
    },
    text:{
        lineHeight: 24,
        letterSpacing: 1,
        fontSize: 20,
        color:  "#333333",
        fontWeight: 600,
        marginVertical: 10,
        textAlign: 'center',
        marginTop: 90
    }
})


export default FinishedRecording;