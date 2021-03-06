const io = require('socket.io')();

// HANDLING
io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });
});

///SET UP
const port = 3000;
io.listen(port);
console.log('listening on port (timer tut)', port)