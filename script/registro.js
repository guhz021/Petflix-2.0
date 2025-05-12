document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('registration-form');
  
    if (!regForm) {
      console.error('Formulário de registro não encontrado!');
      return;
    }
  
    regForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Impede o envio padrão do formulário
  
      // Obtém os valores dos campos
      const name = document.getElementById('name').value.trim();
      const cpf = document.getElementById('cpf').value.trim();
      const email = document.getElementById('email').value.trim();
      const age = document.getElementById('age').value.trim();
      const password = document.getElementById('password').value.trim();
  
      // Validação simples (pode ser expandida conforme necessário)
      if (!name || !cpf || !email || !age || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
  
      // Cria um objeto com os dados do usuário
      const user = { name, cpf, email, age, password };
  
      // Armazena os dados do usuário no localStorage com uma chave exclusiva para o seu projeto
      localStorage.setItem('meuProjeto_user', JSON.stringify(user));
  
      alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
  
      // Redireciona para a tela de login
      window.location.href = '../HTML/login.html';
    });
  });
  
