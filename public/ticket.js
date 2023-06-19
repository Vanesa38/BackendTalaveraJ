document.addEventListener("DOMContentLoaded", () => {
    const finalizarCompraButton = document.getElementById("finaldeCompra");
    if (finalizarCompraButton) {
    finalizarCompraButton.addEventListener("click", () => {
        console.log("Finalizando compra");
        const cartId = finalizarCompraButton.getAttribute("data-cart-id");
        console.log("invoco al endpoint una vez");
    fetch(`/ticket/${cartId}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })
            .then((response) => response.json())
            .then((data) => {
            if (data._id) {
                console.log("Ticket creado con exito")
                window.location.href = `/ticket/${data._id}`;
            } else {
                console.error(data.error);
          
            }
        })
            .catch((error) => {
            console.error(error);
      
        });
    });
    }
  });
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("Submit");
    submitButton.addEventListener("click", async () => {
      try {
        const ticketContent = document.querySelector(".content").innerHTML;
  
        const response = await fetch("/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketHTML: ticketContent }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const email = data.email 
  
          console.log("Correo electrónico enviado con exito");
  
          const cartId = data.cartId;
    
  
          const deleteCartResponse = await fetch(`/api/carts/${cartId}`, {
            method: "DELETE",
        });
  
        if (deleteCartResponse.ok) {
          console.log("Carrito vaciado exitosamente");
        } else {
          console.error("Error al vaciar el carrito");
        }
  
  
          setTimeout(() => {
            window.location.href = "/endofpurchase";
          }, 2000);
        } else {
          console.error("Error al enviar el correo electrónico");
        }
      } catch (error) {
        window.location.href = "/endofpurchase";
        console.error("Error al enviar el correo electrónico:", error);
      }
    });
  });