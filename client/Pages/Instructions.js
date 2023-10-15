import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import store from '../store'
import CarouselPackage from '../components/CarouselPackage';
// import Test from '../components/Test';
import Recording from '../components/Recording';
import FinishedRecording from '../components/FinishedRecording';

const Instructions = () => {
  const isRecording = useSelector(state => state.recording.isRecording);
  const numRecording = useSelector(state => state.recording.numRecording)

  return (
    <View style={styles.container}>
        {
            !isRecording ? (numRecording !== 0 ? <FinishedRecording/> : <CarouselPackage/>)
            : <Recording/>
        }
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#FEFDF7',
    justifyContent: 'flex-end',
  },
});

export default Instructions