
module.exports = function route(app, server, io){
    
    app.get('/', (req, res) => {
        res.render('index');
    });

    const users = []; // Store users
    const chat = []; // Store chat
    
    io.sockets.on('connection', (socket) => {
        

        // => GET_USERS => LIST_USERS
        // emit user list to new client
        socket.on('request_content', () => {
            socket.emit('list_users', users);
            socket.emit('list_msgs', chat);
        });

        // => ADD_USER => USER_JOIN
        // broadcast user to page
        socket.on('add_user', (user) => {
            user.id = socket.id;
            users.push(user);
            io.emit('user_join', user);
        });

        // => USER_LEFT => REMOVE_USER
        socket.on('user_left', (user) => {
            for(let i = 0; i < users.length; i++){
                if(users[i].id === user.id){
                    users.splice(i, 1);
                }
            }
            io.emit('remove_user', user);
        });

        // => ADD_MSG => PRINT_MSG
        socket.on('add_msg', (message) => {
            chat.push(message);
            io.emit('print_msg', message);
        });


    });

};