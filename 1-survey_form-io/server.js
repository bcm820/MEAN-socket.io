
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

const server = app.listen(8000);
const io = require(`${mods}/socket.io`).listen(server);

io.sockets.on('connection', (socket) => {

    socket.on('post', (post) => {
        let data = post.data;
        let client = {
            name: data.name,
            dojo: data.dojo,
            stack: data.stack,
            comment: data.comment,
        };
        socket.emit('print', {data:client});
        let random = {
            number: Math.floor(Math.random() * (1000 - 1)) + 1,
            id: socket.id
        };
        socket.emit('random_nums', {data:random});
    });

});