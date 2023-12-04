import React from 'react';
import {Button, View, StyleSheet} from 'react-native'

const AnalyseButton = ({handleReRecord}) => {

    return (
        <View style={styles.container}>
            <Button 
            title={"Re-Record"}
            onPress={handleReRecord} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        borderColor: '#0284c7',
        color: '#0284c7',
        borderWidth: 1,      
        borderRadius: 50, 
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
})

export default AnalyseButton;