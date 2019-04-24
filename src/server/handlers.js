//Helper function, we don't need to export it
function makeHandleEvent(client, clientManager, chatroomManager) {
    
    //This is a key-function - used a lot to create a promise, either success or rejection with message
    function ensureExists(getter, rejectionMessage) {
        return new Promise((resolve, reject) => {
            const res = getter()
            return res
                ? resolve(res)
                : reject(rejectionMessage)
        })
    }

    function ensureUserSelected(clientId) {
        return ensureExists(
            () => clientManager.getUserByClientId(clientId),
            'select user first'
        )
    }

    function ensureValidChatroom(chatroomName) {
        return ensureExists(
            () => chatroomManager.getChatroomByName(chatroomName),
            `invalid chatroom name: ${chatroomName}`
        )
    }

    function ensureValidChatroomAndUserSelected(chatroomName) {
        return Promise.all([
            ensureValidChatroom(chatroomName),
            ensureUserSelected(client.id)
        ])
            .then(([chatroom, user]) => Promise.resolve({chatroom, user}))
    }

    function handleEvent(chatroomName, createEntry) {
        //either for sending message or registering something in room
        return ensureValidChatroomAndUserSelected(chatroomName)
            .then( ({chatroom, user}) => {
                //append event to chat history
                const entry = {user, ...createEntry()}
                chatroom.addEntry(entry)

                //notify other clients in chatroom
                chatroom.broadcastMessage({chat: chatroomName, ...entry})
                return chatroom
            })
    }
    return handleEvent
}


module.exports = (client, clientManager, chatroomManager) => {
    const handleEvent = makeHandleEvent(client, clientManager, chatroomManager)

    function handleRegister(userName, callback){
        //Check if available
        if(!clientManager.isUserAvailable(userName)){
            return callback('user is not available')
        }
        const user = clientManager.getUserByName(userName)
        clientManager.registerClient(client, user)
        //when success
        return callback(null, user)
    }

    function handleJoin(chatroomName, callback) {
        //create Entry which would be: user 'entry'
        //This is not the full entry cause we will add the user in handleEvent
        const eventEntry = () => ({event: `joined ${chatroomName}`})

        //handleEvent.then{return callback}.catch
        handleEvent(chatroomName, eventEntry)
            .then( (chatroom) => {
                //add the user to the chatroom
                chatroom.addUser(client)
                //send chat history to the clients
                callback(null, chatroom.getChatHistory())
            })
            .catch(callback)
            //TODO: what does .catch(callback) do?
    }

    function handleLeave(chatroomName, callback) {
        const eventEntry = () => ({event: `left ${chatroomName}`})

        handleEvent(chatroomName, eventEntry)
            .then(chatroom => {
                chatroom.removeUser(client)
                callback(null)
            })
            .catch(callback)
    }

    function handleMessage({chatroomName, message} = {}, callback) {
        const messageEntry = () => ({message})

        handleEvent(chatroomName, messageEntry)
            .then( () => callback(null))
            .catch(callback)
    }

    function handleGetChatrooms(_, callback) {
        return callback(null, chatroomManager.serializeChatrooms())
    }

    function handleGetAvailableUsers(_, callback) {
        return callback(null, chatroomManager.getAvailableUsers())
    }

    function handleDisconnect() {
        clientManager.removeClient(client)
        chatroomManager.removeClient(client)
    }

    return {
        handleDisconnect,
        handleEvent,
        handleGetAvailableUsers,
        handleGetChatrooms,
        handleJoin,
        handleLeave,
        handleMessage,
        handleRegister,
    }
}
