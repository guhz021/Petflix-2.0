document.addEventListener('DOMContentLoaded', () => {
    // Recupera os dados do usuário armazenados no localStorage com a mesma chave usada no registro
    const storedUserJSON = localStorage.getItem('meuProjeto_user');
    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON);
      
      // Verifica se a propriedade 'name' existe e atualiza o texto do elemento
      if (user.name) {
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
          usernameElement.textContent = user.name;
        }
      }
    }
  });
  