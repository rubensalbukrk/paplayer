
import React, { useState,ReactNode} from 'react';
import {View, Image, ImageSourcePropType} from 'react-native';

interface BackgroundProps {
    childre?: ReactNode
    index: number
}

export const Background: React.FC<BackgroundProps> = (props) => {

    const images: { [key: number]: ImageSourcePropType } = {
        0: require('../../assets/images/Backgrounds/Background0.jpeg'),
        1: require('../../assets/images/Backgrounds/Background1.jpg'),
        2: require('../../assets/images/Backgrounds/Background2.jpg'),
        3: require('../../assets/images/Backgrounds/Background3.png'),
        4: require('../../assets/images/Backgrounds/Background4.jpeg'),
        5: require('../../assets/images/Backgrounds/Background5.jpeg'),
        6: require('../../assets/images/Backgrounds/Background6.jpg'),
        7: require('../../assets/images/Backgrounds/Background7.jpg'),
        8: require('../../assets/images/Backgrounds/Background8.jpg'),
        // Adicione mais imagens conforme necessário
      };

    return(
        <Image 
        source={images[props.index]} 
        style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
    )
}
export default Background;