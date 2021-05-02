import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import ChatList from "../components/chat/ChatList";
import ChatService from "../services/ChatService";
import ChatCreateButton from "../components/chat/ChatCreateButton";

/*------------------------------------------------------------------------------------
 * Edit Date   : 2020.12.26
 * Edit By     : kwak ji hoon
 * Description : Chat Container Screen
 *----------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------
 * 01) Styles
 *----------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
      container: {
          margin: 20
      },
  }
);

/*------------------------------------------------------------------------------------
 * 02) Static Variables
 *----------------------------------------------------------------------------------*/
function getChatRooms() {
    let temp = [
        {id: 5, name: 'GyCompany 단톡방'},
        {id: 6, name: 'GyCompany 단톡방2'},
    ]
    return temp;
}

/*------------------------------------------------------------------------------------
 * 03) React
 *----------------------------------------------------------------------------------*/
const ChatDetailScreen = () => {
    /*-------------------------------------------------------------------------------
    * 03-1) Hooks
    *-------------------------------------------------------------------------------*/

    const [chatRooms, setChatRooms] = useState([]);
    useEffect(() => {

    }, []);

    /*-------------------------------------------------------------------------------
   * 03-2) fetch Methods
   *-------------------------------------------------------------------------------*/
    const initializeData = useCallback(() => {
        (async () => {
            try {
                let fetchedMyChatRooms = (await fetchMyChatRooms()).data.contents;
                setChatRooms(fetchedMyChatRooms);
            } catch (e) {
                setChatRooms(getChatRooms());
            }
        })();
    });
    const fetchMyChatRooms = useCallback(() => {
        return ChatService.getMyChatRooms();
    })

    const createChatRoomProp = useCallback((name, callback) => {
        var req = {name}
        ChatService.createChattingRoom(req)
          .then((res) => {
              setChatRooms([...chatRooms, res.data]);
          });
    })
    /*-------------------------------------------------------------------------------
    * 03-3) Hooks Effects
    *-------------------------------------------------------------------------------*/
    useEffect(initializeData, []);

    /*-------------------------------------------------------------------------------
    * 03-4) View
    *-------------------------------------------------------------------------------*/
    return (
      <SafeAreaView style={styles.container}>
          <ChatList chatState={{chatRooms, setChatRooms}}> </ChatList>
          <ChatCreateButton
            title={"Create Chatting Room."}
            onPress={() => {
                createChatRoomProp("test");
            }}
          />
      </SafeAreaView>
    )
}
export default ChatDetailScreen;
