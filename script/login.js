document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    if (!loginForm) {
      console.error('Formulário de login não encontrado!');
      return;
    }
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Impede o envio padrão do formulário
  
      // Obtém os valores informados no formulário
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      // Recupera os dados do usuário armazenados no localStorage usando a chave exclusiva
      const storedUser = JSON.parse(localStorage.getItem('meuProjeto_user'));
  
      if (!storedUser) {
        alert('Nenhum usuário cadastrado. Por favor, registre-se.');
        return;
      }
  
      // Verifica se o email e a senha correspondem ao usuário cadastrado
      if (storedUser.email === email && storedUser.password === password) {
        // Login bem-sucedido: redireciona para a página de perfil
        window.location.href = '../HTML/perfil.html';
      } else {
        alert('Email ou senha incorretos. Tente novamente.');
      }
    });
  });
  
