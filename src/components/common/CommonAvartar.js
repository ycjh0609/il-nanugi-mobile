import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Animated } from "react-native";
import {Avatar} from "react-native-elements";

/* 01) Start Style ***************************************************************************************************************/
const styles = StyleSheet.create({


});
/* 01) End Style ***************************************************************************************************************/
/* 02) Start Static Function Group ******************************************************************************************************/

/* 02) End Static Function Group ***************************************************************************************************************/
/* 03) Start View ***************************************************************************************************************/
const CommonAvartar = ({ size,title }) => {
    useEffect(() => {

    }, []);
    /* 03-1) End View ***************************************************************************************************************/
    return (
        <View>
           <Avatar
                    activeOpacity={0.2}
                    avatarStyle={{}}
                    containerStyle={{}}
                    iconStyle={{}}
                    imageProps={{}}
                    onAccessoryPress={() => alert("onAccessoryPress")}
                    onLongPress={() => alert("onLongPress")}
                    onPress={() => alert("onPress")}
                    overlayContainerStyle={{}}
                    placeholderStyle={{}}
                    rounded
                    showAccessory
                    size={"small"}
                    source={{ uri: "https://www.google.com/search?q=anything+image&client=safari&rls=en&sxsrf=ALeKk00TYIrn18YnXWz0e1SAfpnh5vxvHg:1607433259677&tbm=isch&source=iu&ictx=1&fir=7OqzUxRaQDgK2M%252Ctug9DXJEB-r_SM%252C_&vet=1&usg=AI4_-kS9H_5QhBHY15JN1kTBDLnIPRC0Cg&sa=X&ved=2ahUKEwjLssXDu77tAhXWEqYKHYwzAC4Q9QF6BAgJEAE#imgrc=7OqzUxRaQDgK2M" }}
                    title={title?title:"T"}
                    titleStyle={{}}
                />
        </View>

    )
    /* 03-1) End View ***************************************************************************************************************/
}

/* 03) End View ***************************************************************************************************************/
export default CommonAvartar;