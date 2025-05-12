document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tipoSelect = document.getElementById("tipo");
    const outroTipoGroup = document.getElementById("outroTipoPetGroup");
    const inputFoto = document.getElementById("imagem");

    // Exibir campo "Outro" quando necessário
    tipoSelect.addEventListener("change", () => {
        if (tipoSelect.value === "Outro") {
            outroTipoGroup.style.display = "block";
        } else {
            outroTipoGroup.style.display = "none";
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita recarregar a página

        // Capturar os valores do formulário
        const nome = document.getElementById("nome").value.trim();
        const raca = document.getElementById("raca").value.trim();
        const tipo = tipoSelect.value;
        const outroTipo = document.getElementById("outroTipo").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const vacinas = Array.from(document.querySelectorAll("input[name='vacinas']:checked"))
            .map(v => v.value);

        const file = inputFoto.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                salvarPet(nome, raca, tipo, outroTipo, descricao, vacinas, reader.result);
            };
        } else {
            salvarPet(nome, raca, tipo, outroTipo, descricao, vacinas, "../assets/default.jpg");
        }
    });
});

function salvarPet(nome, raca, tipo, outroTipo, descricao, vacinas, imagem) {
    if (!nome || !raca || !tipo || !descricao) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const novoPet = {
        id: Date.now(),
        nome,
        raca,
        tipo: tipo === "Outro" ? outroTipo : tipo,
        descricao,
        vacinas,
        imagem,
        gender: "",
        age: "",
        isFavorite: false,
        adopted: false
    };

    let pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.push(novoPet);
    localStorage.setItem("pets", JSON.stringify(pets));

    // Aguarda um pequeno tempo antes de redirecionar para evitar problemas com LocalStorage
    setTimeout(() => {
        window.location.href = "../HTML/adotar.html";
    }, 500);
}
