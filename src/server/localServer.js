export default function() {

    function register(type, name, cb) {
        console.log('Server temp handled Register for ', name);

        const messageEntry = {
            user: name,
            message: 'Logged In',
            img: '',
            key: name+'122'+type,
        }
        cb(messageEntry);
    }

    function message(type, messageEntry, cb) {
        console.log('Server temp handled Message: ', messageEntry.message)
        cb();
    }

    return {
        register,
        message,
    }
}