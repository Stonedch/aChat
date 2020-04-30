
const socket = io();
function chat() {
  const form = document.getElementById('form');
  const message = document.getElementById('message');
  const messages = document.getElementById('messages');
  
  
  form.addEventListener('submit', sendMessage)
  
  function sendMessage(event) {
    event.preventDefault();
    socket.emit('chat message', `${message.value}`);
    message.value = '';
    return false;
  };
  
  socket.on('message', function (msg) {
    const li = document.createElement('li');
    li.innerHTML = msg;
    messages.append(li) ;
    window.scrollTo(0, document.body.scrollHeight);
  });


}

chat();