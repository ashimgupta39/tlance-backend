window.onload = function () {
  let socket = io();
  socket.emit('logged_in',{
    from: $('#msgFrom').val()
  })
  $('#msgFrom').hide()
  $('#btnSend').click(()=>{
    socket.emit('msg_send', {
      msg: $('#inpNewMsg').val(),
      to: $('#inpToUser').val(),
      from: $('#msgFrom').val()
    })
  })
  socket.on('msg_rcvd', (data)=>{
    // if(data.to==$('#msgFrom').val()){
    $('#ulMsgs').append($('<li>').text(data.from+": "+data.msg))
    // }
  })
};
