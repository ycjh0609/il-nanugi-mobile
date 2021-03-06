import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import _ from "lodash";
import ToolBar from './ToolBar';
import moment from "moment";
import ToDoCard from './ToDoCard';
import CodeUtil from '../../utils/code/CodeUtil';
import commonStyle from '../../styles/commonStyle';
import { Badge } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import StringUtil from '../../utils/string/StringUtil';


/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.30
 * Edit By     : kwak ji hoon 
 * Description : SimpleBoard
 *----------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TaskList = ({ navigation, tasksState, sortType, filterBy, getTaskUpdater, title }) => {
    return (
        <View>
            {tasksState.tasks.filter(filterBy).map((task, idx) => {
                return (
                    <ToDoCard key={"to-do-card-" + idx}
                        task={task}
                        sortType={sortType}
                        navigation={navigation}
                        updateTask={getTaskUpdater(task)}
                        groupName={StringUtil.createSummarizeName(task.group.name)} />
                )
            })}
        </View>
    )
}
const ToDoList = ({ navigation, items, setItems }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/
    const [sortType, setSortType] = useState(0);
    const [reCollacatedTasks, setReCollacatedTasks] = useState([]);
    
    
    /***************************
    * ????????? ??? ??? ????????? ????????? ??? ?????? setter ?????? 
    ***************************/
    const getTaskUpdater = useCallback(passedTask => {
        // ??? ????????? ???????????? setCard??? ???????????? ?????? ????????? setter??? ??????
        const updateTask = (updatedTask) => {
            let updatedTaskIdx = (items.tasks.findIndex((task) => task.id === passedTask.id));
            items.tasks[updatedTaskIdx] = updatedTask;
            setItems.setTasks([...items.tasks]);
        }
        return updateTask;
    })
    /***************************
    * ?????? ???????????? (?????? / ?????? / ??????)
    ***************************/
    const getOrderByTaskStatus = useCallback((status) => {
        if (status === CodeUtil.TASK_STATUS.TODO) return 0;
        if (status === CodeUtil.TASK_STATUS.DOING) return 1;
        if (status === CodeUtil.TASK_STATUS.END) return 2;
    })
    /***************************
     * ???????????? ?????? hook (ToolBar ?????? sortType??? ???????????? setTask??? ???????????? ??????????????????)
    ***************************/
    useEffect(function handleSortType() {
        if (sortType === CodeUtil.TASK_SORT_TYPE.BY_ENDTIME) {

            let temp = [...items.tasks].sort((a, b) => {
                return moment(a.endTime, 'YYYYMMDDhhmm') - moment(b.endTime, 'YYYYMMDDhhmm');
            });
            setReCollacatedTasks(temp);
            //setReCollacatedTasks(_.sortBy([...items.tasks], [{ "endTime": "desc" }]));
        } else if (sortType === CodeUtil.TASK_SORT_TYPE.BY_STATUS) {
            setReCollacatedTasks(_.sortBy([...items.tasks], ["status", "groupId", "endTime"]));
        } else if (sortType === CodeUtil.TASK_SORT_TYPE.BY_GROUP_ID) {
            setReCollacatedTasks(_.sortBy([...items.tasks], ["groupId", "endTime"]));
        }
    }, [sortType, items.tasks]);
    
    useEffect(() => {
        setReCollacatedTasks(items.tasks)
    }, [])
    


    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <View style={styles.container}>
            {/* 01. title and toolbar */}
            
            <ToolBar sortState={{ sortType, setSortType }} itemStates={{ items, setItems }} />
            
            {/* 02. List */}
            <ScrollView>
                <View style={{ marginBottom: 550 }}>
                    {/* 02-2. ?????? ??? ????????? */}
                    {sortType === CodeUtil.TASK_SORT_TYPE.BY_ENDTIME &&
                        <View>
                            <TaskList navigation={navigation} sortType={sortType} getTaskUpdater={getTaskUpdater} tasksState={{ tasks: reCollacatedTasks, setTasks: setItems.setTasks }}
                                filterBy={() => true} />
                        </View>
                    }
                    
                    {/* 02-2. ?????? ????????? ????????? */}
                    {sortType === CodeUtil.TASK_SORT_TYPE.BY_STATUS &&
                        <View>
                            {Object.values(CodeUtil.TASK_STATUS)
                                .sort((a, b) => getOrderByTaskStatus(a) - getOrderByTaskStatus(b))
                                .map((code, idx) => {
                                    let statusText = CodeUtil.getTaskTextByStatus(code);
                                    let filterByStatus = (t) => t.status === code;
                                    // ??? ??????????????? ???????????? ????????? ???????????? ??????
                                    return (
                                        <View key={"task-set-" + idx}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                <Icon name={"check"} size={20} color={CodeUtil.getTaskColorByStatus(code)}></Icon>
                                                <Text style={{ fontSize: 18, marginLeft: 10,marginRight:10,fontWeight:"600" }}>{statusText}</Text>
                                                <Badge
                                                    value={reCollacatedTasks.filter(filterByStatus).length}
                                                    badgeStyle={{ backgroundColor: CodeUtil.getTaskColorByStatus(code) ,width:30}}
                                                    textStyle={{fontWeight:"600"}}
                                                />
                                            </View>
                                            {reCollacatedTasks.filter(filterByStatus).length === 0 &&
                                                <View style={{ marginLeft: 30 }}>
                                                    <Text style={{ color: commonStyle.oneTextColor, marginTop: 5,marginBottom:5, fontSize: 15, marginLeft: 2 }}>
                                                        <Icon name={"folder-open"} size={15}></Icon>
                                                        {code === CodeUtil.TASK_STATUS.TODO && "  ?????? ????????? ?????? ????????????."}
                                                        {code === CodeUtil.TASK_STATUS.DOING && "  ?????? ???????????? ?????? ????????????."}
                                                        {code === CodeUtil.TASK_STATUS.END && "  ?????? ????????? ?????? ????????????."}
                                                    </Text>
                                                </View>
                                            }
                                            {reCollacatedTasks.filter(filterByStatus).length > 0 &&
                                                <TaskList navigation={navigation} sortType={sortType} getTaskUpdater={getTaskUpdater} tasksState={{ tasks: reCollacatedTasks, setTasks: setItems.setTasks }}
                                                    filterBy={filterByStatus} />
                                            }
                                        </View>
                                    )
                                })}
                        </View>
                    }
                    {/* 02-3. ????????? ????????? */}
                    {sortType === CodeUtil.TASK_SORT_TYPE.BY_GROUP_ID &&
                        <View>
                            {items.groups.map((group, idx) => {
                                let groupName = group.name;
                                let filterByGroupId = (t) => t.group.id === group.id;
                                
                                return (
                                    <View key={"task-set-" + idx}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                            <Icon name={"user-friends"} size={20} />
                                            <Text style={{ fontSize: 18, marginLeft: 10,marginRight:10 }}>{groupName}</Text>
                                            <Badge
                                                value={reCollacatedTasks.filter(filterByGroupId).length}
                                                badgeStyle={{ backgroundColor: group.color, width:30 }}
                                                
                                            />
                                        </View>
                                        {reCollacatedTasks.filter(filterByGroupId).length == 0 &&
                                            <View style={{ marginLeft: 30 }}>
                                                <Text style={{ color: commonStyle.oneTextColor, marginTop: 5,marginBottom: 5, fontSize: 15, marginLeft: 2 }}>
                                                    ????????? ?????? ????????????.
                                                </Text>
                                            </View>
                                        }
                                        <TaskList navigation={navigation} sortType={sortType} getTaskUpdater={getTaskUpdater} tasksState={{ tasks: reCollacatedTasks, setTasks: setItems.setTasks }}
                                            filterBy={filterByGroupId} />

                                    </View>
                                )
                            })}
                        </View>
                    }
                </View>
            </ScrollView>


        </View>
    )
}
export default ToDoList;