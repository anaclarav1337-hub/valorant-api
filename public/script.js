async function carregarAgentes() {
const lista = document.getElementById("lista-agentes");

try {
    const resposta = await fetch("/agentes");
    const agentes = await resposta.json();

    lista.innerHTML = "";

    if (agentes.length === 0) {
        lista.textContent = "Nenhum agente cadastrado.";
        return;
    }

    agentes.forEach(function(agente) {
        const card = document.createElement("div");
        card.className = "agente";

        const titulo = document.createElement("h3");
        titulo.textContent = agente.nome;
        card.appendChild(titulo);

        const id = document.createElement("p");
        id.textContent = "ID: " + agente._id;
        card.appendChild(id);

        const funcao = document.createElement("p");
        funcao.textContent = "Função: " + agente.funcao;
        card.appendChild(funcao);

        const nacionalidade = document.createElement("p");
        nacionalidade.textContent = "Nacionalidade: " + agente.nacionalidade;
        card.appendChild(nacionalidade);

        const subtitulo = document.createElement("h4");
        subtitulo.textContent = "Habilidades";
        card.appendChild(subtitulo);

        agente.habilidades.forEach(function(habilidade) {
            const item = document.createElement("div");
item.className = "habilidade";
            const nomeHabilidade = document.createElement("h5");
nomeHabilidade.textContent = habilidade.nome;
item.appendChild(nomeHabilidade);

            const tecla = document.createElement("p");
            tecla.textContent = "Tecla: " + habilidade.tecla;
            item.appendChild(tecla);

            const descricao = document.createElement("p");
            descricao.textContent = habilidade.descricao;
            item.appendChild(descricao);

            card.appendChild(item);
        });

        lista.appendChild(card);
    });

} catch (erro) {
    lista.textContent = "Erro ao carregar os agentes.";
    console.error(erro);
}

}

carregarAgentes();