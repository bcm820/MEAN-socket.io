
module.exports = function route(app, server, io){
    
    app.get('/', (req, res) => {
        res.render('index');
    });

    io.sockets.on('connection', (socket) => {
    
        let count = 0;
        
        socket.on('load', () => {
            io.emit('update', {data: count});
        });
        
        socket.on('epic', () => {
            count += 1;
            io.emit('update', {data: count});
        });

        socket.on('reset', () => {
            count = 0;
            io.emit('update', {data: count});
        });

    });
};