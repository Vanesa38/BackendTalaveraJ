const socket=io();
socket.emit('mensaje','Hola cliente websocket');
socket.on('singlecast',(data) => {
    console.info(data)
});
socket.on('broadcast',(data) => {
    console.warn(data)
});
socket.on('multicast',(data) => {
    console.error(data)
});
