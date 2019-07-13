import localServer from '../server/localServer';

export default function() {
    const socket = localServer();

    function registerHandler(onMessageReceived) {
        //This set's up a listener, in client, for messages. Should tell the server how to handle sending a message

        //Should be 
        //socket.on('message', onMessageReceived)

        //TODO - MOCKUP - fix correct username and the actual call i want here
        //messageReceived takes messageEntry
        socket.onMessage('message', onMessageReceived)
    }

    function unregisterHandler() {
        //TODO
        //socket.off('message')
        console.log('Server mockup handled unregister')
    }

    function register(user, cb) {
        //TODO
        //socket.emit('register', name, cb)
        if(!user) Error('No user when client tried to send register-req to server')
        else socket.register('register', user.name, cb)
    }

    function join(chatRoomName, cb) {
        //socket.emit('join', chatRoomName, cb)
        console.log('TODO: handle client JOIN in socket')
        socket.join('join', chatRoomName, cb)
    }

    function leave(chatRoomName, cb) {
        //socket.emit('leave', chatRoomName, cb)
        socket.leave('leave', chatRoomName, cb)
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
        console.log('Getting chatrooms. Socket is reaching for server')
        socket.getChatRooms('chatrooms', null, cb)
    }

    function getAvailableUsers(updateAvailableUsersCallback) {
        //socket.emit('availableUsers', null, cb)
        socket.availableUsers('availableUsers', null, updateAvailableUsersCallback)        
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
