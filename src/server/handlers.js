let lastEntryId = 0;

function makeHandleEvent(client, clientManager, chatroomManager) {

  function getNextEntryId() {
    lastEntryId += 1
    return lastEntryId;
  }

  function ensureExists(getter, rejectionMessage) {
    return new Promise(function (resolve, reject) {
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
      .then(([chatroom, user]) => Promise.resolve({ chatroom, user }))
  }

  function handleEvent(chatroomName, createEntry) {
    const id = getNextEntryId()
    return ensureValidChatroomAndUserSelected(chatroomName)
      .then(function ({ chatroom, user }) {
        // append event to chat history
        const entry = { user, id, ...createEntry() }
        chatroom.addEntry(entry)

        // notify other clients in chatroom
        chatroom.broadcastMessage({ chat: chatroomName, ...entry })
        return chatroom
      })
  }

  return {
    handleEvent,
    ensureValidChatroomAndUserSelected
  }
}

module.exports = function (client, clientManager, chatroomManager) {
  const {handleEvent, ensureValidChatroomAndUserSelected } = makeHandleEvent(client, clientManager, chatroomManager)

  function handleRegister(userName, callback) {
    if (!clientManager.isUserAvailable(userName))
      return callback('user is not available')

    const user = clientManager.getUserByName(userName)
    clientManager.registerClient(client, user)

    return callback(null, user)
  }

  function handleJoin(chatroomName, callback) {
    const createEntry = () => ({ event: `joined ${chatroomName}` })

    handleEvent(chatroomName, createEntry)
      .then(function (chatroom) {
        // add member to chatroom
        chatroom.addUser(client)

        // send chat history to client
        callback(null, chatroom.getChatHistory())
      })
      .catch(callback)
  }

  function handleLeave(chatroomName, callback) {
    const createEntry = () => ({ event: `left ${chatroomName}` })

    handleEvent(chatroomName, createEntry)
      .then(function (chatroom) {
        // remove member from chatroom
        chatroom.removeUser(client)

        callback(null)
      })
      .catch(callback)
  }

  function handleMessage({ chatroomName, message } = {}, callback) {
    console.log('Server handleMessage sees chatroomName: ' + chatroomName + ' and message: ' + message)
    const createEntry = () => ({ message })

    handleEvent(chatroomName, createEntry)
      .then(() => callback(null))
      .catch(callback)
  }

  function handleIsTyping({chatroomName, isTyping}, callback) {
    ensureValidChatroomAndUserSelected(chatroomName)
      .then(({chatroom, user}) => {
        console.log(`handling ${user.name} istyping ${isTyping} in ${chatroomName}`)
        //add user as typing or not typing
        if(isTyping)
          chatroom.addTypingUser(client)
        else
          chatroom.removeTypingUser(client)
        //broadcast typing from chatroom
        chatroom.broadcastSomeoneIsTyping(clientManager)
        callback(null)
      })
      .catch(callback)
  }

  function handleGetChatrooms(_, callback) {
    return callback(null, chatroomManager.serializeChatrooms())
  }

  function handleGetAvailableUsers(_, callback) {
    return callback(null, clientManager.getAvailableUsers())
  }

  function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client)
    // remove member from all chatrooms
    chatroomManager.removeClient(client)
  }

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleIsTyping,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  }
}
