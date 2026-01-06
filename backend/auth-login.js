document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            // Guardamos o ID do utilizador e um estado de login simples
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('isLoggedIn', 'true');
            
            alert("Bem-vindo!");
            window.location.href = 'perfil.html';
        } else {
            alert("Falha no login: " + (result.error || "Dados inválidos."));
        }
    } catch (error) {
        console.error("Erro ao tentar fazer login:", error);
        alert("Erro de ligação ao servidor.");
    }
});