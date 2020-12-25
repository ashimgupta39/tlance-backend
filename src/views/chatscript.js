window.onload = function () {
  let socket = io();
  socket.emit('logged_in',{
    from: $('#msgFrom').val()
  })
  $('#msgFrom').hide()
  $('#inpToUser').hide()
  $('#btnSend').click(()=>{
    socket.emit('msg_send', {
      msg: $('#inpNewMsg').val(),
      to: $('#inpToUser').val(),
      from: $('#msgFrom').val()
    })
  })

  //message system
  const messageContainer=document.querySelector(".container")
  var audio = new Audio('ting.mp3')
  const apend = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
      audio.play();
    }
  }
  socket.on('msg_rcvd', (data)=>{
    // $('#ulMsgs').append($('<div>').text(data.from+": "+data.msg))
    // $('#ulMsgs').addClass('message left')
    apend(`${data.from}: ${data.msg}`,'left')
  })
  socket.on('msg_rcvd_me', (data)=>{
    apend(`You: ${data.msg}`,'right')
  })
};
