const express = require('express');
const app = express();
app.io = require('socket.io')();
const http = require('http')
const server = http.createServer(app)
app.io.attach(server)

const keys = require('./keys');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search');
const homeRoutes = require('./routes/home');
const chatRoutes = require('./routes/chat')(app.io)


const PORT = process.env.PORT || 3000;


app.use(express.json({ extended: true}));

app.use("/static", express.static('./static/'));

app.use('/', homeRoutes);
app.use('/search', searchRoutes.router);
app.use('/chat', chatRoutes);


async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        server.listen(PORT, () => console.log(`Server has been started on ${PORT}`));

    } catch (e) {
        console.log(e);

    }
}

start();

