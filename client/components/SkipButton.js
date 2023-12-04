import React, {useState} from 'react';
import {Button, View, StyleSheet} from 'react-native'
const SkipButton = ({handleSkipToRecording, isSkip}) => {

    return (
        <>
        
            <View style={styles.container}>
                <Button 
                    title={"Skip"}
                    onPress={handleSkipToRecording}
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

export default SkipButton;