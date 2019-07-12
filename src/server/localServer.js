import users from '../config/users'


export default function() {

    /* ---- General TODO
     * add handlers instead of code for all these functions
     * --- */

    function register(type, name, cb) {
        //TODO
        console.log('Server temp handled Register for ', name);
        const messageEntry = {
            user: name,
            message: 'Logged In',
            img: '',
            key: name+'122'+type,
        }
        const user = users[0];

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

    function availableUsers(type, err, updateAvailableUsersCallback) {        
        //TODO - TEMP MOCKUP getting users
        console.log('server temp is getting users...')
        setTimeout(() => {
            updateAvailableUsersCallback(null, users)
        }, 5000)
    }

    return {
        register,
        message,
        availableUsers,
        onMessage,
    }
}