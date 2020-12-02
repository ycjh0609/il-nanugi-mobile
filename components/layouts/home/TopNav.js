import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Avatar } from 'react-native-elements';
const styles = StyleSheet.create({
    topNavContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor:'#eee',
        borderBottomWidth:0.5,
        paddingLeft: 20,
        paddingRight:20
    },

});
const TopNav = () => {

    const [count, setCount] = useState(0);
    useEffect(() => {

    }, [count]);

    return (
        <View style={styles.topNavContainer}>
            <Text>Tom</Text>

            <View>
                <Text>My Work</Text>
            </View>
            <View>
                <Avatar size="small"
                    rounded
                    title="T"
                    avatarStyle={{backgroundColor:"grey"}}
                    titleStyle={{backgroundColor:"white"}}
                    
                />
            </View>
        </View>
    )
}
export default TopNav;