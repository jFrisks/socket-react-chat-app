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

  function broadcastSomeoneIsTyping() {
    //TODO - can this be overflodded?
    const isTyping = !(whoIsTyping.size === 0)
    members.forEach(m => m.emit('someoneIsTyping', isTyping))
    
    /*
    const interval = 1000;
    isTypingInterval = setInterval(() => {
      const isTyping = !(whoIsTyping.size === 0)
      if(!isTyping) clearInterval(isTypingInterval)
      members.forEach(m => m.emit('someoneIsTyping', isTyping))
    }, interval);
    */
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
