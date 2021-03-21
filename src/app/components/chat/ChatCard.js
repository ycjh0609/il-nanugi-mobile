import React from 'react';
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";

/*------------------------------------------------------------------------------------
 * Edit Date   : 2021.03.21
 * Edit By     : kwak ji hoon
 * Description : SimpleBoard
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  preview: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginRight: 5,
  },
  title: {
    width: '100%',
  }

});
/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ChatCard = ({title}) => {
  /*-------------------------------------------------------------------------------
  * 03-1) Hooks
  *-------------------------------------------------------------------------------*/

  /*-------------------------------------------------------------------------------
  * 03-2) View
  *-------------------------------------------------------------------------------*/
  return (
    <View style={styles.container}>
      <View style={styles.preview}>

      </View>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
    </View>
  )
}
export default ChatCard;
