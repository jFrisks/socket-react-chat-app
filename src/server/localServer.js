import users from '../config/users'
import chatHistory from '../config/chatHistory'


export default function() {

    /* ---- General TODO
     * add handlers instead of code for all these functions
     * --- */

    function register(type, name, cb) {
        //TODO - add so we get back actual user

        console.log('Server temp handled Register for ', name);
        const messageEntry = {
            user: name,
            message: 'Logged In',
            img: '',
            key: name+'122'+type,
        }
        const user = users.find((user) => user.name === name)
        if (!user)
            return cb(Error(`Couldn't find user: ${name}`))
        cb(null, user);
    }

    function onMessage(type, onMessageRecievedToClient) {
        //TODO - Should do so chatroom will use this callback with message. 
        //var onMessageRecievedToClientCallback = onMessageRecievedToClient;
    }

    function message(type, messageEntry, cb) {
        //TODO
        console.log('Server temp handled Message: ', messageEntry.message)
        cb();
    }

    function join(type, chatroomName, cb) {
        //TODO - fix join to real deal
        setTimeout(() => cb(null, chatHistory), 1000)
    }

    function leave(type, chatroomName, cb) {
        console.log('Server temp handling leave for ', chatroomName)
        setTimeout(() => {
            cb(null)
        }, 1000)   
    }

    function availableUsers(type, err, updateAvailableUsersCallback) {        
        //TODO - TEMP MOCKUP getting users
        console.log('server temp is getting users...')
        setTimeout(() => {
            updateAvailableUsersCallback(null, users)
        }, 5000)
    }

    return {
        register,
        join,
        leave,
        message,
        availableUsers,
        onMessage,
    }
}