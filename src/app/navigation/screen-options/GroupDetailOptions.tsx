import React from 'react';
import {StackScreenProps} from "@react-navigation/stack";

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.01.26
 * Edit By     : kwak ji hoon
 * Description : GroupDetail Stack Screen Options
 * https://reactnavigation.org/docs/headers/
 *----------------------------------------------------------------------------------*/
export type GroupList = {
    GroupDetailScreen: { screen: string, group: any }
}

interface GroupDetailOptionsProps {

}

const GroupDetailOptions: React.FC<GroupDetailOptionsProps
    & StackScreenProps<GroupList, 'GroupDetailScreen'>> = ({route, navigation}) => {
    const {group} = route.params
    return {
        title: group.name,
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
