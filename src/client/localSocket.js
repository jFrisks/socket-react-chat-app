import localServer from '../server/localServer';

export default function() {
    
    function registerHandler(onMessageReceived) {
        //socket.on('message', onMessageReceived)
        //local should call method from localServer
        localServer().handleRegister()

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

    function register(name, cb) {
        //socket.emit('register', name, cb)
    }

    function join(chatRoomName, cb) {
        //socket.emit('join', chatRoomName, cb)
    }

    function leave(chatRoomName, cb) {
        //socket.emit('leave', chatRoomName, cb)
    }

    function message(chatRoomName, msg, cb){
        //socket.emit('message', {chatRoomName, message: msg}, cb)
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
