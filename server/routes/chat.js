const { Router } = require('express');
const router = Router();
const path = require('path')
let User = require('../models/user')
const ip = require('ip');
let id = ''


router.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));

  const getKey = async () => {
    try {
      const userId = ip.address().toString();
      const user = (await User.find({ "myself.userId": userId }))[0]
      return user.myself.ioKey

    } catch (e) {
      console.log(e);
    }
  }

  id = await getKey()
  
});


module.exports =  function (io) {
  
  io.on('connection', socket => {
    console.log(id);
    socket.join(`${id}`, () => {
      socket.on('chat message', msg => {
        if (msg == '') { }
        else {
          io.to(id).emit('message', `msg: ${msg}`);
          
        }
      });
    })

    socket.on('disconnect', () => {
      io.to(id).emit('message', 'user disconnected');
    })

  })

  return router;
}