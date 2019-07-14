module.exports = function ({ name, image }) {
  const members = new Map()
  let chatHistory = []

  //TODOS
  //- Should probably store users since clients can disconnect and get new client ids...
  //-

  function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message))
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
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize
  }
}
