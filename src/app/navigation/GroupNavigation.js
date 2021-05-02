import React from 'react';
import {StyleSheet} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import GroupListScreen from '../containers/GroupListScreen';
import GroupDetailScreen from '../containers/GroupDetailScreen';
//import GroupDetailOptions from "./screen-options/GroupDetailOptions";
/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.27
 * Edit By     : kwak ji hoon
 * Description : Honme Stack Screen
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
const GroupStack = createStackNavigator();


const GroupDetailOptions = ({ route }) => {
    const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });

    let {group} = route.params;
    return {
        title: group.name,
        headerStyle: {
            backgroundColor: group.color,
            height: 120
        },
        headerLeftContainerStyle: {
            marginLeft: 15
        },
        headerBackTitleStyle: {
            fontSize: 18, fontWeight: "bold"
        },
        headerBackTitle: "그룹",
        headerTintColor: '#fff',
        cardStyleInterpolator: forFade,
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    }
}

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const GroupNavigation = ({ route, navigation }) => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------
    * 03-2) View
    *-------------------------------------------------------------------------------*/
    return (
        <GroupStack.Navigator >
            <GroupStack.Screen name="GroupListScreen" component={GroupListScreen} options={{ headerShown: false }} />
            <GroupStack.Screen name="GroupDetailScreen" component={GroupDetailScreen} options={GroupDetailOptions} />
        </GroupStack.Navigator>
    )
}
export default GroupNavigation;
