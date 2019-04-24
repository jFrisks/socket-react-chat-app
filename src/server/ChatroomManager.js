const Chatroom = require('./Chatroom')
const chatroomTemplates = require('../config/chatrooms')

module.exports = () => {
    //map all available chatrooms
    const chatrooms = new Map(
        chatroomTemplates.map(c => [
            c.name,
            Chatroom(c)
        ])
    )

    function removeClient(client) {
        chatrooms.delete(client.name)
    }

    function getChatroomByName(chatroomName) {
        return chatrooms.get(chatroomName)
    }

    function serializeChatrooms() {
        return Array.from(chatrooms.values().map(chatroom => chatroom.serialize()))
    }

    return {
        serializeChatrooms,
        getChatroomByName,
        removeClient,
    }
}