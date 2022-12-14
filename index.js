import { Server } from 'socket.io';
import path from 'path';
import http from "http";
import express from "express";
import ejs from "ejs";
import { receiveMessageOnPort } from 'worker_threads';
import { inflate } from 'zlib';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let author = "";

const port = 8383;
// ESPECIFICANDO O DIRETORIO PARA A CRIACAO DAS PASTAS


app.use(express.static(path.join("", 'public')));
app.set('views', path.join("", 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log('socket connected:' + author + "   ==    " + socket.id);
    socket.emit("user", author);

    socket.emit("previewsMessage", messages);
    socket.on("sendMessage", data => {
        messages.push(data);
        socket.broadcast.emit("receivedMessage", data);

    });

    socket.on("sendData", data => {

        if (data.Email == "milagre" && data.Password == "milagre") {
            socket.emit("confirmation", "OK");
            author = data.Email;
        } else {
            socket.emit("confirmation", "NO");
        }

    });


});



server.listen(process.env.PORT || port);