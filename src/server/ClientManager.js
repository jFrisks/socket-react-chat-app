/* This is for the lobby. Where we add and remove people */

const userTemplates = require('../config/user')

module.exports = () => {
    //map all of clients connected
    const clients = new Map()
    
    function addClient(client) {
        clients.set(client.id, { client })
    }

    function registerClient(client, user) {
        clients.set(client.id, { client, user })
    }

    function removeClient(client) {
        clients.delete(client.id)
    }

    function getAvailableUsers() {
        //TODO: Potentially reduce function to directly see available users instead of nonexist->existing.
        //Could be due to eventlisteners update, but not sure why...
        const usersTaken = new Set(
            Array.from(clients.values())
                .filter(c => c.user)
                .map(c => c.user.name)
        )
        return userTemplates
            .filter(u => !usersTaken.has(u.name))
    }

    function isUserAvailable(userName) {
        return getAvailableUsers().some(u => u.name === userName)
    }

    function getUserByName(userName) {
        userTemplates.find(u => u.name === userName)
    }

    function getUserByClientId(clientId) {
        return (clients.get(clientId) || {}).user
    }

    return {
        addClient,
        registerClient,
        removeClient,
        getAvailableUsers,
        isUserAvailable,
        getUserByName,
        getUserByClientId
    }
}