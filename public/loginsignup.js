

const elementExiste = (id) => document.getElementById(id) !== null;

elementExiste("send") &&
    document.getElementById("send").addEventListener("click", function () {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`/login`, {
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then(response => response.json())
        .then(data => {

            console.log(data)
        sessionStorage.setItem("cartId", data.cartID);
            
                console.log('Intentando redireccionar...')


                window.location.href = "/product"
        
        
        })
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
        const rol = "user"
        const cartID =""

        if(!first_name || !last_name|| !email||!password||!age){
            alert("Los campos estan incompletos")
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
                rol,
                cartID
        
            }),
            })
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error("Network response was not ok");
                }
                return response.json();
                })
                .then((data) => {
                    console.log (data)
                    if (data.message === "Usuario Creado"){
                        window.location.href = "/login"
                    }else {
                        alert ("Credenciales Incorrectas")
                    }
                }
                
            )}
            });
        
   
        elementExiste("ver") &&
        document.getElementById("ver").addEventListener("click", function(){
            window.location.href="/products"
        })
