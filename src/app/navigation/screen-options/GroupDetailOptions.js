
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.26
 * Edit By     : kwak ji hoon 
 * Description : GroupDetail Stack Screen Options
 * https://reactnavigation.org/docs/headers/
 *----------------------------------------------------------------------------------*/

const GroupDetailOptions = ({ route }) => {

    return {
        title: route.params.group.name,
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
}

export default GroupDetailOptions;