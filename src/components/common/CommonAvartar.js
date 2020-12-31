import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Animated } from "react-native";
import { Avatar } from "react-native-elements";
import commonStyle from '../../common/styles/commonStyle';

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
const CommonAvartar = ({ size, title, onPress, onLongPress }) => {
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
                containerStyle={{}}
                iconStyle={{}}
                imageProps={{}}
                onAccessoryPress={() => alert("onAccessoryPress")}
                onLongPress={onLongPress}
                onPress={onPress}
                overlayContainerStyle={{}}
                placeholderStyle={{}}
                rounded
                showAccessory
                size={"small"}
                source={{ uri: "https://www.google.com/search?q=anything+image&client=safari&rls=en&sxsrf=ALeKk00TYIrn18YnXWz0e1SAfpnh5vxvHg:1607433259677&tbm=isch&source=iu&ictx=1&fir=7OqzUxRaQDgK2M%252Ctug9DXJEB-r_SM%252C_&vet=1&usg=AI4_-kS9H_5QhBHY15JN1kTBDLnIPRC0Cg&sa=X&ved=2ahUKEwjLssXDu77tAhXWEqYKHYwzAC4Q9QF6BAgJEAE#imgrc=7OqzUxRaQDgK2M" }}
                title={title ? title : "T"}
                titleStyle={{color:commonStyle.oneTextInColor,fontWeight:"700"}}
            />
        </View>

    )
}
export default CommonAvartar;