import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot'

const CarouselIndicator = ({curPage}) => {
    return (
        <>
         <PaginationDot
            curPage={curPage}
            maxPage={3}
            sizeRatio={1.5}
            activeDotColor='blue'
        inactiveDotColor='black'
        />
        </>
    );
};

export default CarouselIndicator;

const styles = StyleSheet.create({
})