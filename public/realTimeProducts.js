const paragraph = document.getElementById('paragraph')
const input = document.getElementById('input')

const socket = io();


input.addEventListener('keyup', (event)=>{
    let  newProductToAdd = event.target.value 
    if (event.key === "Enter" ){
        if (input.value.trim().length){
        socket.emit('message', newProductToAdd);
    }
    input.value =""
    }
})


socket.on("paragraph", data =>{
    let html = data.map ( (product) => {
        return `<span>Producto: ${product.title}</span>`
    })
    paragraph.innerHTML=html
});