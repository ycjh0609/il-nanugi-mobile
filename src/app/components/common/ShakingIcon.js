

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from "react-native";
import { Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.02.14 
 * Edit By     : kwak ji hoon 
 * Description : Common Shake Icon
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    
});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ShakingIcon = (iconProps) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const iconX = useRef(new Animated.Value(120)).current;
    
    useEffect(()=>{
        Animated.loop(
            Animated.sequence([
                Animated.timing(iconX, { toValue: 1, duration: 100, useNativeDriver: true }),
                Animated.timing(iconX, { toValue: -1, duration: 100, useNativeDriver: true }),
                Animated.timing(iconX, { toValue: 1, duration: 100, useNativeDriver: true }),
                Animated.timing(iconX, { toValue: 0, duration: 100, useNativeDriver: true })
            ])
        ).start();
    })
    
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <Animated.View  style={{ transform: [{translateX: iconX}] }}>  
            <Icon {...iconProps} />
        </Animated.View >
    )
}
export default ShakingIcon;