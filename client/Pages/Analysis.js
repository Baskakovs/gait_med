import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeButton from '../components/HomeButton';
import { setMessage } from '../features/logging/loggingSlice';

const Analysis = ({navigation}) => {
    const csv = useSelector(state => state.data.csv)
    const dispatch = useDispatch()
    const message = useSelector(state => state.logging.message)

  return (

    <View style={styles.container}>
        {message === 'normal' ? 
            <>
            <Text style={styles.title}>{"Normal Gait Detected"}</Text>
            </>
            :
            (message === 'abnormal' ?
            <Text style={styles.title}>{"Abnormal Gait Detected"}</Text>
            :
            <Text style={styles.title}>{message}</Text>)
        }
        <HomeButton navigation={navigation}/>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFDF7',
        marginVertical: 50,
        height: '100%'
    },
    title:{
        lineHeight: 28,
        letterSpacing: 1,
        fontSize: 28,
        color:  "#333333",
        fontWeight: 600,
        marginVertical: 10,
        textAlign: 'center',
        marginTop: 90
    },

    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: 15,
    },
    hide: {
      display: 'none'
    }
});

export default Analysis