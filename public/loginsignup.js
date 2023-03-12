const elementExiste = (id) => document.getElementById(id) !== null;

elementExiste("send") &&
    document.getElementById("send").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`/login`, {
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify({

            username,
            password,
        }),
    })
        .then((response) => response.json())
        .then((data) => data.message =="success" 
        ? (window.location.href="/products")
        : alert ("algo ha pasado")
        )
        .catch((error) => console.error(error));
});
    

document.getElementById("ingreso").addEventListener("click", function(){
    window.location.href="/login"
})


elementExiste("signup") &&
    document.getElementById("signup").addEventListener("click", function () {
        const first_name= document.getElementById("first_name").value;
        const last_name= document.getElementById("last_name").value;
        const email= document.getElementById("email").value;
        const password= document.getElementById("password").value;
        const age = document.getElementById("age").value;
if(!first_name || !last_name|| !email||!password||!age){
}else {
    fetch("/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify({
           first_name,
           last_name,
           email,
           password,
           age,
            
        }),
    })
        .then((response) => response.json())
        .then((data) =>
        data.message === "Usuario creado"
        ? (window.location.href = "/login")

        : alert("Algo ha pasado")
   
      )
        .catch((error) => console.error(error));
}
    });