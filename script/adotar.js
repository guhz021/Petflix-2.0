const posts = [
    { id: 1, user: "Paçoca", image: "../assets/pacoca.jpg", caption: "Adote este lindo amiguinho!", gender: "F", age: "adulto", isFavorite: false, adopted: false },
    { id: 2, user: "Bino", image: "../assets/bino.jpg", caption: "Pronto para um novo lar.", gender: "M", age: "adulto", isFavorite: false, adopted: false },
    { id: 3, user: "Kiara", image: "../assets/kiara.jpg", caption: "Carinho e lealdade.", gender: "F", age: "adulto", isFavorite: false, adopted: false },
    { id: 4, user: "Laika", image: "../assets/laika.jpg", caption: "Uma nova chance de ser feliz.", gender: "F", age: "filhote", isFavorite: false, adopted: false },
    { id: 5, user: "Pipo", image: "../assets/pipo.jpg", caption: "Esperando por um lar cheio de amor.", gender: "M", age: "filhote", isFavorite: false, adopted: false },
    { id: 6, user: "Bia", image: "../assets/bia.jpg", caption: "Adoção é amor!", gender: "F", age: "adulto", isFavorite: false, adopted: false },
    { id: 7, user: "Nibo", image: "../assets/nibo.jpg", caption: "Um companheiro fiel.", gender: "M", age: "adulto", isFavorite: false, adopted: false },
    { id: 8, user: "Paula", image: "../assets/paula.jpg", caption: "Pronto para novas aventuras.", gender: "F", age: "filhote", isFavorite: false, adopted: false },
    { id: 9, user: "Roberto", image: "../assets/roberto.jpg", caption: "Cada animal merece uma chance.", gender: "M", age: "adulto", isFavorite: false, adopted: false },
    { id: 10, user: "Juliana", image: "../assets/juliana.jpg", caption: "Encontre seu novo melhor amigo.", gender: "F", age: "adulto", isFavorite: false, adopted: false }
];

/* Função para buscar os pets cadastrados no LocalStorage */
function getPetsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("pets")) || [];
}

/* Função para renderizar os posts no feed */
function renderPosts() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    // Junta os pets fixos com os cadastrados no localStorage
    const allPosts = [...posts, ...getPetsFromLocalStorage()];

    if (allPosts.length === 0) {
        feed.innerHTML = "<p>Nenhum animal para exibir.</p>";
        return;
    }

    allPosts.forEach(post => {
        // Ignora posts que já foram adotados
        if (post.adopted) return;

        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <h3>${post.user || post.nome}</h3>
            <img src="${post.image || post.imagem || '../assets/default.jpg'}" alt="Imagem do animal" 
     onerror="this.onerror=null;this.src='/assests/default.jpg';">

            <p>${post.caption || post.descricao}</p>
            <div class="actions">
                <button class="btn" onclick="toggleFavorite(${post.id})">${post.isFavorite ? 'Desfavoritar' : 'Favoritar'}</button>
                <button class="btn" onclick="adoptPost(${post.id})">Adotar</button>
            </div>
            <p><small>Sexo: ${post.gender || 'Não informado'} | Idade: ${post.age || 'Não informado'}</small></p>
        `;

        feed.appendChild(postDiv);
    });
}

/* Função para atualizar a renderização com base nos filtros */
function filterPosts() {
    const genderFilter = document.getElementById("filter-gender").value;
    const ageFilter = document.getElementById("filter-age").value;

    let allPosts = [...posts, ...getPetsFromLocalStorage()];
    let filtered = allPosts.filter(post => !post.adopted);

    if (genderFilter) {
        filtered = filtered.filter(post => post.gender === genderFilter);
    }

    if (ageFilter) {
        filtered = filtered.filter(post => post.age === ageFilter);
    }

    renderPosts(filtered);
}

/* Função para alternar o status de favorito */
function toggleFavorite(id) {
    let allPosts = [...posts, ...getPetsFromLocalStorage()];
    const post = allPosts.find(p => p.id === id);
    if (post) {
        post.isFavorite = !post.isFavorite;
        localStorage.setItem("pets", JSON.stringify(allPosts.filter(p => p.id > 10))); // Salva só os novos no localStorage
        renderPosts();
    }
}

/* Função para adotar o animal */
function adoptPost(id) {
    let allPosts = [...posts, ...getPetsFromLocalStorage()];
    const post = allPosts.find(p => p.id === id);
    if (post) {
        post.adopted = true;
        localStorage.setItem("pets", JSON.stringify(allPosts.filter(p => p.id > 10))); // Salva só os novos no localStorage
        renderPosts();
    }
}

/* Função para mostrar apenas os animais favoritos */
function showFavorites() {
    let allPosts = [...posts, ...getPetsFromLocalStorage()];
    const favorites = allPosts.filter(post => post.isFavorite && !post.adopted);
    renderPosts(favorites);
}

/* Carregar os posts ao iniciar */
window.addEventListener("DOMContentLoaded", () => {
    renderPosts();

    document.getElementById("filter-gender").addEventListener("change", filterPosts);
    document.getElementById("filter-age").addEventListener("change", filterPosts);
});
