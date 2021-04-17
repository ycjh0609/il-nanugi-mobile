import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Animated } from "react-native";
import { Avatar } from "react-native-elements";
import commonStyle from '../../styles/commonStyle';

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.26 
 * Edit By     : kwak ji hoon 
 * Description : Common Avartar
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    circle: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
* 03) React
*----------------------------------------------------------------------------------*/
const CommonAvartar = ({ containerStyle,overlayContainerStyle, size, title,profileUrl, onPress, onLongPress,titleStyle }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    useEffect(() => {

    }, []);
    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View>
            <Avatar
                activeOpacity={0.2}
                avatarStyle={{}}
                containerStyle={containerStyle}
                iconStyle={{}}
                imageProps={{}}
                onAccessoryPress={() => alert("onAccessoryPress")}
                onLongPress={onLongPress}
                onPress={onPress}
                overlayContainerStyle={overlayContainerStyle}
                rounded
                showAccessory
                size={size ? size: "small"}
                source={{ uri: profileUrl}}
                title={title ? title : "T"}
                titleStyle={titleStyle? titleStyle : {color:commonStyle.oneTextInColor,fontWeight:"700"}}
            />
        </View>

    )
}
export default CommonAvartar;