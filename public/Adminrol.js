const rolButtons = document.getElementsByClassName('rolButtonClass');
const deleteButtons = document.getElementsByClassName('deleteButtonClass');

//controladores a los botones de cambio de rol

Array.from(rolButtons).forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
  
    // Obtener el ID del usuario del atributo data
    const userId = event.target.dataset.userId;
  
    try {

      // Realizar la solicitud a backend utilizando fetch
      const response = await fetch('/listOfUsers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      // Verificar estado de la respuesta
      if (response.ok) {
        const data = await response.json();

        // Hacer algo con la respuesta de backend

        console.log(data);
      } else {
        console.error('Error en la solicitud al backend');
      }
    } catch (error) {
      console.error(error);
    }
  });
});

//controladores de eventos a los botones de eliminación

Array.from(deleteButtons).forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
  
    // Obtener el ID del usuario del atributo data
    const userId = event.target.dataset.userId;
  
    try {
      // Realizar solicitud a backend utilizando fetch
      const response = await fetch(`/listOfUsers/${userId}`, {
        method: 'DELETE',
      });
  
      // Verificar estado de la respuesta
      if (response.ok) {
        const data = await response.json();

        // Hacer algo con la respuesta de backend
        console.log(data);
      } else {
        console.error('Error en la solicitud al backend');
      }
    } catch (error) {
      console.error(error);
    }
  });
});