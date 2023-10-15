import React, {useRef, useState} from 'react';
import {Text, View, Dimensions, Image, StyleSheet} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import StartRecordingButton from './StartRecordingButton';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const data = [
  {
    id: 1,
    name: 'Press Record',
    src: require('../assets/record_illustration.png'),
  },
  {
    id: 2,
    name: 'Place the phone in the pocket of your trousers',
    src: require('../assets/pocket_illustration.png'),
  },
  {
    id: 3,
    name: 'Walk naturally in a straight line for 20 seconds.',
    src: require('../assets/walk_illustration.png'),
  },
  {
    id: 4,
    name: 'The recording will stop automatically, and begin analysis.',
    src: require('../assets/analyse_illustration.png'),
  },
  {
    id: 5,
    name: 'Start Action',
    isActionButton: true,
  }
];
const renderItem = ({item}) => {
  if (item.isActionButton) {
    return (
      <View style={styles.buttonContainer}>
        <StartRecordingButton/>
      </View>
    );
  }

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Image source={item.src} style={styles.image} />
      <Text style={styles.text}> {item.name} </Text>
    </View>
  );
};
  
  const CarouselPackage = () => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);  
    return (
      <View style={styles.container}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          ref={carouselRef}
          onSnapToItem={(index) => setActiveIndex(index)}  
        />
        <Pagination
          activeDotIndex={activeIndex} 
          dotsLength={data.length}
          carouselRef={carouselRef}
        />
      </View>
    );
  };
  export default CarouselPackage;

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
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })