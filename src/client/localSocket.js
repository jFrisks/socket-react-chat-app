import localServer from '../server/localServer';

export default function() {
    const server = localServer();

    function registerHandler(onMessageReceived) {
        //socket.on('message', onMessageReceived)
        //local should call method from localServer
        //TODO - fix correct username

        const userName = 'MOCKUP USER';
        register(userName, onMessageReceived)

        /*
        //temp
        console.log('temp register Handler')

        const tempMessage = {
            user: 'Mockup User',
            message: 'Logged In',
            img: '',
            key: 1231223321,
        }

        onMessageReceived(tempMessage);
        */
    }

    function unregisterHandler() {
        //socket.off('message')
    }

    function register(name, onMessageReceived) {
        //socket.emit('register', name, cb)
        server.register('register', name, onMessageReceived)
    }

    function join(chatRoomName, cb) {
        //socket.emit('join', chatRoomName, cb)
    }

    function leave(chatRoomName, cb) {
        //socket.emit('leave', chatRoomName, cb)
    }

    function message(chatRoomName, msg, cb){
        //TODO - TEMP - fix all props
        const messageEntry = {
            user: 'Mockup User',
            message: msg,
            img: '',
            key: msg+'12'+chatRoomName,
        }

        //socket.emit('message', {chatRoomName, message: msg}, cb)
        server.message('message', messageEntry, cb)    //TEMP
    }

    function getChatRooms(cb) {
        //socket.emit('chatrooms', null, cb)
    }

    function getAvailableUsers(cb) {
        //socket.emit('availableUsers', null, cb)
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
