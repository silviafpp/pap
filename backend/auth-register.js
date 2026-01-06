document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura os dados do formulário
    const userData = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Conta criada com sucesso! A redirecionar para o login...");
            window.location.href = 'login.html';
        } else {
            alert("Erro: " + (result.error || "Não foi possível registar."));
        }
    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        alert("O servidor está desligado ou houve um erro de rede.");
    }
});