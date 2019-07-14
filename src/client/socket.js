const io = require('socket.io-client')
export default function() {
    const port = 3001;
    const socket = io.connect('http://localhost:'+port)

    function registerHandler(onMessageReceived) {
        console.log('sending registerHandler to server')
        socket.on('message', onMessageReceived)
    }

    function unregisterHandler() {
        socket.off('message')
    }

    socket.on('error', (err) => {
        console.log('received socket error:', err);
    })

    function register(name, cb) {
        socket.emit('register', name, cb)
    }

    function join(chatroomName, cb) {
        socket.emit('join', chatroomName, cb)
    }

    function leave(chatroomName, cb) {
        socket.emit('leave', chatroomName, cb)
    }

    function message(chatroomName, msg, cb){
        socket.emit('message', {chatroomName, message: msg}, cb)
    }

    function getChatRooms(cb) {
        console.log('getting chatrooms')
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
