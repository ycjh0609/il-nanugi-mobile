import commonAxios from "../utils/axios/commonAxios";

const ChatService = {
  /*-------------------------------------------------------------------------------
   * 1) Requests
   *-------------------------------------------------------------------------------*/
  /**
   * 채팅방을 조회한다.
   * @param {Number} chatId
   * @return chat
   */
  getChatOne: (chatId) => {
    return commonAxios.get(`/chats/${chatId}`)
  },
  /**
   * 채팅방을 생성핟다
   * @param {Object} group
   * @returns group
   */
  createChattingRoom: (data) => {
    return commonAxios.post(`/chat/rooms`, data)
  },

  /*-------------------------------------------------------------------------------
   * 2) Action Requests
   *-------------------------------------------------------------------------------*/
  /**
   * 내가 참여중인 채팅방 리스트를 조회힌다 (back-end signedUser 를 이용)
   * @returns chat
   */
  getMyChatRooms: () => {
    //let userInfo = getStoreItem("userInfo");
    return commonAxios.get(`/chat/rooms/me`);
  },
  /**
   *
   */

  /*-------------------------------------------------------------------------------
   * 3) Action Requests
   *-------------------------------------------------------------------------------*/
  /**
   * 내가 참여중인 채팅방 리스트를 조회힌다 (back-end signedUser 를 이용)
   * @returns chat
   */
  enterChatRooms: (id) => {
    //let userInfo = getStoreItem("userInfo");
    return commonAxios.get(`/chat/enter/${id}`);
  },
  /**
   *
   */
}

export default ChatService
