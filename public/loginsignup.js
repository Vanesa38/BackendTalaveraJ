const elementExists = (id) => document.getElementById(id) !== null;

elementExists("send") &&
    document.getElementById("send").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`/login?username=${username}&password=${password}`, {});
    console.log("Usuario Logueado")
        .then((response) => response.json())
        .then((data) => data.message =="success" ? window.location.href="/api/productsDB" : alert ("algo ha pasado"))
        .catch((error) => console.error(error));
    });

document.getElementById("ingreso").addEventListener("click", function(){
    window.location.href="/login"
})


elementExists("signup") &&
    document.getElementById("signup").addEventListener("click", function () {
        const first_name= document.getElementById("first_name").value;
        const last_name= document.getElementById("last_name").value;
        const email= document.getElementById("email").value;
        const password= document.getElementById("password").value;
        const age = document.getElementById("age").value;
if(!first_name || !last_name|| !email||!password||!age){
}else {
    fetch("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify({
            username,
            password,
            
        }),
    })
        .then((response) => response.json())
        .then((data) =>
        data.message === "logged in"
        ? (window.location.href = "/api/productsDB")

        : alert("Algo ha pasado")
   
      )
        .catch((error) => console.error(error));
}
    });