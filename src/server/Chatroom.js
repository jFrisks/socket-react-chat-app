module.exports = function ({ name, image }) {
  const members = new Map()
  const whoIsTyping = new Map()
  let chatHistory = []

  var isTypingInterval = undefined;

  //TODOS
  //- Should probably store users since clients can disconnect and get new client ids...
  //-

  function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message))
  }

  function addTypingUser(client){
    whoIsTyping.set(client.id, client)
  }

  function removeTypingUser(client) {
    whoIsTyping.delete(client.id)
  }

  function broadcastSomeoneIsTyping(clientManager) {
    //TODO - can this be overflodded?
    //const isTyping = !(whoIsTyping.size === 0)
    //members.forEach(m => m.emit('someoneIsTyping', isTyping))
    const typingClientIDs = Array.from(whoIsTyping.keys());
    const typingUsers = typingClientIDs.map(clientID => clientManager.getUserByClientId(clientID))
    //console.log('server - these users are typing', typingUsers.size)
    members.forEach(m => m.emit('someoneIsTyping', typingUsers))

  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
  }

  function getChatHistory() {
    return chatHistory.slice()
  }

  function addUser(client) {
    members.set(client.id, client)
  }

  function removeUser(client) {
    console.log('removed client ' + client.id + 'from chatroom', name)
    members.delete(client.id)
    removeTypingUser(client)
  }

  function serialize() {
    return {
      name,
      image,
      numMembers: members.size
    }
  }

  return {
    broadcastMessage,
    addTypingUser,
    removeTypingUser,
    broadcastSomeoneIsTyping,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize
  }
}
