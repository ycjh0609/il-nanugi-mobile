import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 15,
        marginBottom: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        
        backgroundColor: "#ced1c2",

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    }
});
const Card = ({ cardStyle, onPress }) => {
    useEffect(() => {

    }, []);
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <View>
                <View style={{ ...styles.cardContainer, ...cardStyle }}>
                    <View >
                        <Text style={{ textAlign: "right", fontSize: 25 }}>÷</Text>

                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}
export default Card;