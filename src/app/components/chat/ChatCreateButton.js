import React from 'react';
import {StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import commonStyle from "../../styles/commonStyle";

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.03.21
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
const ChatCreateButton = ({title, onPress}) => {
  /*-------------------------------------------------------------------------------
  * 03-1) Hooks
  *-------------------------------------------------------------------------------*/

  /*-------------------------------------------------------------------------------
  * 03-2) View
  *-------------------------------------------------------------------------------*/
  return (

    <Button
      style={{
        backgroundColor: commonStyle.oneTextColor,
        borderRadius: 10,
        borderWidth: 0,
      }}
      titleStyle={{color: 'white'}}
      title={title}
      type="outline"
      onPress={onPress}
    />

  )
}
export default ChatCreateButton;
