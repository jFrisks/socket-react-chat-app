import localServer from '../server/localServer';

import users from '../config/users';

export default function() {
    const socket = localServer();

    function registerHandler(onMessageReceived) {
        //TODO - fix correct username and the actual call i want here
        //messageReceived takes messageEntry
        //socket.on('message', onMessageReceived)

        //local should call method from localServer - This is mockup - server should provide the message
        const userName = 'MOCKUP USER';
        register(userName, onMessageReceived)

        socket.message(onMessageReceived)
    }

    function unregisterHandler() {
        //socket.off('message')
        console.log('Server mockup handled unregister')
    }

    function register(name, onMessageReceived) {
        //socket.emit('register', name, cb)
        socket.register('register', name, onMessageReceived)
    }

    function join(chatRoomName, cb) {
        //socket.emit('join', chatRoomName, cb)
    }

    function leave(chatRoomName, cb) {
        //socket.emit('leave', chatRoomName, cb)
    }

    function message(chatRoomName, msg, cb){
        //TODO - TEMP - fix all props and get messages
        const messageEntry = {
            user: 'Mockup User',
            message: msg,
            img: '',
            key: msg+'12'+chatRoomName,
        }

        //socket.emit('message', {chatRoomName, message: msg}, cb)
        socket.message('message', messageEntry, cb)    //TEMP
    }

    function getChatRooms(cb) {
        //socket.emit('chatrooms', null, cb)
    }

    function getAvailableUsers(updateAvailableUsersCallback) {
        //socket.emit('availableUsers', null, cb)

        //TODO - TEMP MOCKUP getting users
        console.log('server is getting users...')
        setTimeout(() => {
            updateAvailableUsersCallback(null, users)
        }, 10000)
        
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
