const {Router} = require('express');
const router = Router();
const path = require('path')

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

module.exports = function (io) {
    const id = 'arstts';
    io.on('connection', socket => {
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
};