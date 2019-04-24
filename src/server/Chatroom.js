module.exports = (name, image) => {
    const clientMembers = new Map()
    let chathistory = []

    function broadCastMessage(message) {
        clientMembers.forEach(c => {
            c.emit('message', message)
        });
    }

    function addEntry(entry) {
        chathistory = chathistory.concat(entry)
    }

    function getChatHistory() {
        return chathistory.slice()
    }

    function addUser(client) {
        clientMembers.set(client.id, client)
    }

    function removeUser(client) {
        clientMembers.delete(client.id)
    }

    function serialize() {
        return {
            name,
            image,
            numMembers: clientMembers.size,
        }
    }

    return {
        broadCastMessage,
        addEntry,
        getChatHistory,
        addUser,
        removeUser,
        serialize,
    }
}