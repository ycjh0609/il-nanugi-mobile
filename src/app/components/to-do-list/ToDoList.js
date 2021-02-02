import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import _ from "lodash";
import ToolBar from './ToolBar';
import ToDoCard from './ToDoCard';
import CodeUtil from '../../utils/code/CodeUtil';
import commonStyle from '../../styles/commonStyle';
import { Icon } from 'react-native-elements';

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
function createGroupName(name) {
    if (name.split(" ").length == 1) {
        return name.split(" ")[0].substring(0, 2);
    } else if (name.split(" ").length > 1) {
        return name.split(" ")[0].substring(0, 1) + "" + name.split(" ")[1].substring(0, 1);
    }
}
/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const TaskList = ({ navigation,tasksState, sortType, filterBy, getTaskUpdater, title }) => {

    return (
        <View>
            {tasksState.tasks.filter(filterBy).map((task, idx) => {
                return (
                    <ToDoCard key={"to-do-card-" + idx}
                        task={task}
                        sortType={sortType}
                        navigation={navigation}
                        updateTask={getTaskUpdater(task)}
                        groupName={createGroupName(task.group.name)} />
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
    * 렌더링 될 각 카드에 전달할 각 카드 setter 생성 
    ***************************/
    const getTaskUpdater = useCallback(passedTask => {
        // 각 카드가 변경되어 setCard가 호출되면 카드 전체를 setter로 변경
        const updateTask = (updatedTask) => {
            let updatedTaskIdx = (items.tasks.findIndex((task) => task.id === passedTask.id));
            items.tasks[updatedTaskIdx] = updatedTask;
            setItems.setTasks([...items.tasks]);
        }
        return updateTask;
    })
    /***************************
    * 상태 정렬순서 (예정 / 진행 / 완료)
    ***************************/
    const getOrderByTaskStatus = useCallback((status) => {
        if (status === CodeUtil.TASK_STATUS.TODO) return 0;
        if (status === CodeUtil.TASK_STATUS.DOING) return 1;
        if (status === CodeUtil.TASK_STATUS.END) return 2;
    })
    useEffect(function handleMount() {
        setReCollacatedTasks(items.tasks)
    }, [])
    /***************************
     * 정렬순서 변경 hook (ToolBar 에서 sortType이 변경되면 setTask가 실행됨을 알고있어야함)
    ***************************/
    useEffect(function handleSortType() {
        if (sortType === CodeUtil.TASK_SORT_TYPE.BY_ENDTIME) {
            setReCollacatedTasks(_.sortBy([...items.tasks], [{"endTime":"asc"}]));
        } else if (sortType === CodeUtil.TASK_SORT_TYPE.BY_STATUS) {
            setReCollacatedTasks(_.sortBy([...items.tasks], ["status", "groupId"]));
        } else if (sortType === CodeUtil.TASK_SORT_TYPE.BY_GROUP_ID) {
            setReCollacatedTasks(_.sortBy([...items.tasks], ["groupId", "endTime"]));
        }
    }, [sortType, items.tasks]);
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
                    {/* 02-2. 마감 순 리스트 */}
                    {sortType === CodeUtil.TASK_SORT_TYPE.BY_ENDTIME &&
                        <View>
                            <TaskList navigation={navigation} sortType={sortType} getTaskUpdater={getTaskUpdater} tasksState={{ tasks: reCollacatedTasks, setTasks: setItems.setTasks }}
                                filterBy={() => true} />
                        </View>
                    }
                    {/* 02-2. 업무 상태별 리스트 */}
                    {sortType === CodeUtil.TASK_SORT_TYPE.BY_STATUS &&
                        <View>
                            {Object.values(CodeUtil.TASK_STATUS)
                                .sort((a, b) => getOrderByTaskStatus(a) - getOrderByTaskStatus(b))
                                .map((code, idx) => {
                                    let statusText = CodeUtil.GET_STATUS_TEXT(code);
                                    let filterByStatus = (t) => t.status === code;
                                    // 현 상태코드의 태스크가 없으면 표시하지 않음
                                    if (reCollacatedTasks.filter(filterByStatus).length === 0) {
                                        return <View key={"task-set-" + idx}></View>;
                                    } else {
                                        return (
                                            <View key={"task-set-" + idx}>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                                                    <Icon name={"check"} size={20}></Icon>
                                                    <Text style={{ fontSize: 18, margin: 5 }}>{statusText}</Text>
                                                </View>
                                                <TaskList navigation={navigation} sortType={sortType} getTaskUpdater={getTaskUpdater} tasksState={{ tasks: reCollacatedTasks, setTasks: setItems.setTasks }}
                                                    filterBy={filterByStatus} />
                                            </View>
                                        )
                                    }
                                })}
                        </View>
                    }
                    {/* 02-3. 그룹별 리스트 */}
                    {sortType === CodeUtil.TASK_SORT_TYPE.BY_GROUP_ID &&
                        <View>
                            {items.groups.map((group, idx) => {
                                let groupName = group.name;
                                let filterByGroupId = (t) => t.groupId === group.id;

                                return (
                                    <View key={"task-set-" + idx}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                                            <Icon name={"group"} size={20}></Icon>
                                            <Text style={{ fontSize: 18, margin: 5 }}>{groupName}</Text>
                                            
                                        </View>
                                        {reCollacatedTasks.filter(filterByGroupId).length == 0 &&
                                            <View style={{ marginLeft:30}}>
                                                <Text style={{ color: commonStyle.oneTextColor, marginTop: 5, fontSize: 15, marginLeft: 2 }}>
                                                    할당된 일이 없습니다.
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