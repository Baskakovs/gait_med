import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRecording } from '../features/recording/recordingSlice';
import {setMessage} from '../features/logging/loggingSlice';
import Icon from 'react-native-vector-icons/FontAwesome';


import AnalyseButton from './AnalyseButton';
import ReRecordButton from './ReRecordButton';
import HomeButton from './HomeButton';

const FinishedRecording = ({navigation}) => {
    const [isAnalysed, setIsAnalysed] = useState(false)
    const [outcome, setOutcome] = useState('')

    const dispatch = useDispatch()
    const handleReRecord = () => {
        dispatch(toggleRecording())
    }

    const csvData = useSelector(state => state.data.csv);
    const jsonData = { csv: csvData }; // Correct JSON structure
    const requestBody = JSON.stringify(jsonData);
    const handleAnalyse = () => {
        setOutcome('Analysing...')
        setIsAnalysed(true)
        fetch('http://gait-med.nw.r.appspot.com/',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: requestBody
        })
        .then(response => {
            setIsAnalysed(true)
            if(response.ok){
                response.json().then(data => {
                setOutcome(data.prediction)
                setIsAnalysed(true)
                })
            }else{
                setOutcome('Error')
                setIsAnalysed(false)
            }
        }
        )
    }

    return (
        <View style={styles.buttonContainer}>
            {!isAnalysed ?
                <>
                    <AnalyseButton handleAnalyse={handleAnalyse}/>
                    <ReRecordButton handleReRecord={handleReRecord}/>
                </>
            :
            (
                outcome === 'Analysing...' ?
                <Text style={styles.text}>
                    {`${outcome}`}
                </Text>
                :
            (
                outcome === 'normal' ? 
            <>
                <Image style={styles.image} source={require('../assets/GAIT.png')}/>
                <Text style={styles.text}>
                    {`${outcome} gait detected.`}
                </Text>
                <HomeButton navigation={navigation}/>
            </>
            : 
            <>
                <Icon name="exclamation-triangle" size={200} color="#0284c7" />
                <Text style={styles.text}>
                    {`${outcome.charAt(0).toUpperCase() + outcome.slice(1)} gait detected. You should consult a doctor.`}
                </Text>
            </>
            )
            )
            }
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
        marginTop: 90,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },
    title:{
        lineHeight: 24,
        letterSpacing: 1,
        fontSize: 28,
        color:  "#333333",
        fontWeight: 600,
        marginVertical: 10,
        textAlign: 'center',
        marginTop: 90
    },
    image: {
        width: Dimensions.get('window').width,
        height: 0.6 * Dimensions.get('window').height,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
      },
})


export default FinishedRecording;