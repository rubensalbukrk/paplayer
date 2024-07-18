
import React, {ReactNode} from 'react';
import {View, Image} from 'react-native';

interface BackgroundProps {
    childre?: ReactNode
}

export const Background: React.FC<BackgroundProps> = () => {
    return(
    
        <Image 
        source={require('../../assets/images/Background3.png')} 
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