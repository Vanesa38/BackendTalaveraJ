document.getElementById('restablecer').addEventListener('click', async (event) => {
    event.preventDefault();
    const token = document.querySelector('input[name="token"]').value;
    const password = document.querySelector('input[name="Newpassword"]').value;
    const repeatPassword = document.querySelector('input[name="repeatNewPassword"]').value;

    const response = await fetch('/reset/:token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        token,
        password,
        repeatPassword
        })
    });

    const data = await response.json();
    alert("Contraseña cambiada con exito");
    window.location.href = '/login'; 
    });