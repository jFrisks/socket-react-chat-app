const io = require('socket.io-client')
export default function() {
    const socket = io.connect('http://localhost:8000')

    function registerHandler(onMessageReceived) {
        socket.on('message', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('message')
    }

    socket.on('error', (err) => {
        console.log('received socket error:');
        console.log(err)
    })

    function register(name, cb) {
        socket.emit('register', name, cb)
    }

    function join(chatRoomName, cb) {
        socket.emit('join', chatRoomName, cb)
    }

    function leave(chatRoomName, cb) {
        socket.emit('leave', chatRoomName, cb)
    }

    function message(chatRoomName, msg, cb){
        socket.emit('message', {chatRoomName, message: msg}, cb)
    }

    function getChatRooms(cb) {
        socket.emit('chatrooms', null, cb)
    }

    function getAvailableUsers(cb) {
        socket.emit('availableUsers', null, cb)
    }

    return {
        register,
        join,
        leave,
        message,
        getChatRooms,
        getAvailableUsers,
        registerHandler,
        unregisterHandler,
    }
}
