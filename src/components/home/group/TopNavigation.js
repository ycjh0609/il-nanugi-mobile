import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import commonStyle from '../../../common/styles/commonStyle';
/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.01
 * Edit By     : kwak ji hoon 
 * Description : Group Dashboard Top Navigation 
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    topNavContainer: {
        width: '100%',
        borderColor: '#eee',
        borderBottomWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10,
        ...commonStyle.rowAlignment
    },

});

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TopNavigation = () => {


    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.topNavContainer}>
            <View style={commonStyle.rowAlignment}>
                <Icon name="filter-list" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{""}</Text>
            </View>
            <View style={commonStyle.rowAlignment}>
                <Icon name="sort" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{""}</Text>
            </View>
        </View>
    )
}

export default TopNavigation;