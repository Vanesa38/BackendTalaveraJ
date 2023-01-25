const send = document.getElementById('submitButton')

const socket = io();


send.addEventListener('click', ()=>{
    let  newProductToAdd = {
        title: title.value,
        price: price.value,
        description: description.value,
        thumbnail:thumbnail.value
    }
    
    if (!!title.value || !!price.value || !!description.value || !!thumbnail.value ) {

        socket.emit('send_message', {...newProductToAdd});
    }
})