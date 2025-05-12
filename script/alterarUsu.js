document.addEventListener('DOMContentLoaded', () => {
    // Obtém a referência do formulário
    const form = document.getElementById('formAlterarUsuario');
    if (!form) {
        console.error('Formulário de alterar usuário não encontrado!');
        return;
    }

    // Intercepta o envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtém os valores digitados e remove espaços em branco nas extremidades
        const novoUsuario1 = document.getElementById('novoUsuario1').value.trim();
        const novoUsuario2 = document.getElementById('novoUsuario2').value.trim();

        // Verifica se os dois campos coincidem
        if (novoUsuario1 === novoUsuario2) {
            // Recupera o usuário armazenado no localStorage com a chave "meuProjeto_user"
            const storedUserJSON = localStorage.getItem('meuProjeto_user');
            if (storedUserJSON) {
                const user = JSON.parse(storedUserJSON);
                
                // Atualiza a propriedade name com o novo valor
                user.name = novoUsuario1;
                
                // Salva novamente o objeto atualizado no localStorage
                localStorage.setItem('meuProjeto_user', JSON.stringify(user));
                
                // Informa o usuário e redireciona para a página de perfil
                if (confirm("Usuário alterado com sucesso! Clique em OK para continuar.")) {
                    window.location.href = "../HTML/usuario.html";
                }
            } else {
                alert("Nenhum usuário cadastrado. Por favor, registre-se.");
            }
        } else {
            alert("Os usuários não coincidem. Por favor, tente novamente.");
        }
    });
});
