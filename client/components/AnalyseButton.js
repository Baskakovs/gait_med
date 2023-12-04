import React from 'react';
import {Button, View, StyleSheet} from 'react-native'

const AnalyseButton = ({handleAnalyse}) => {

    return (
        <View style={styles.container}>
            <Button 
            title={"Analyse"}
            onPress={handleAnalyse} 
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

export default AnalyseButton;