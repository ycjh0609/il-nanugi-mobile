import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
    topNavContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#eee',
        borderBottomWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10
    },

});
const TopNav = ({collocate}) => {

    const [taskTypeText,setTaskTypeText] = useState("");
    const [sortTypeText,setSortTypeText] = useState("");
    
    const changeSortType = () =>{
        if (collocate.sortType == 0) collocate.setSortType(1)
        else if (collocate.sortType == 1) collocate.setSortType(0)
    }
    const changeTaskType = () =>{
        if (collocate.taskType == 0) collocate.setTaskType(1)
        else if (collocate.taskType == 1) collocate.setTaskType(2)
        else if (collocate.taskType == 2) collocate.setTaskType(0)
    }
    useEffect(() => {
        if (collocate.taskType === 0) setTaskTypeText("전체")
        else if (collocate.taskType === 1) setTaskTypeText("진행")
        else if (collocate.taskType === 2) setTaskTypeText("완료")

        if (collocate.sortType === 0) setSortTypeText("마감")
        else if (collocate.sortType === 1) setSortTypeText("중요")

    }, [collocate.taskType,collocate.sortType]);
    return (
        <View style={styles.topNavContainer}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Icon onPress={changeTaskType} name="ios-list" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{taskTypeText}</Text>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Icon onPress={changeSortType} name="md-reorder" size={30} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>{sortTypeText}</Text>
            </View>
        </View>
    )
}
export default TopNav;