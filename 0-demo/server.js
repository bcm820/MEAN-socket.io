
const mods = '../../node_modules';
const express = require(`${mods}/express`);
const path = require(`${mods}/path`);
const app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// retrieve server obj and pass into socket's listen method
const server = app.listen(8000);
const io = require(`${mods}/socket.io`).listen(server);

// when client establishes connection...
io.sockets.on('connection', (socket) => {
    
    // unique ID is assigned
    console.log(socket.id);

    // server socket listens for 'click' from client
    socket.on('click', (data) => {

        console.log(data.message); // message received
        
        // server emits 'response' to client
        socket.emit('response', {msg: 'server to client'});
        
        // broadcast to all except client who clicked
        socket.broadcast.emit('relay', {msg: 'only for the others'});
        
        // broadcast to all clients
        io.emit('broadcast', {msg: 'everyone sees this'});

    });

});