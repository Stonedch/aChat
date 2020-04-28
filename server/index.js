const express = require('express');
const keys = require('./keys');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search');
const homeRoutes = require('./routes/home');


const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());


app.use('/', homeRoutes);
app.use('/search', searchRoutes);


async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));

    } catch (e) {
        console.log(e);

    }
}

start();

