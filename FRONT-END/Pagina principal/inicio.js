import { salvarDoce, buscarDoces } from "../app.js";

const btnAdicionar = document.getElementById('btnAdicionarDoce');
const modal = document.getElementById('modalDoce');
const btnCancelar = document.getElementById('btnCancelar');
const form = document.getElementById('formDoce');

// Abre o modal
btnAdicionar.addEventListener('click', () => {
    modal.classList.remove('container-escondido');
});

// Fecha ao clicar em Cancelar
btnCancelar.addEventListener('click', () => {
    modal.classList.add('container-escondido');
});

// Fecha ao clicar fora do modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('container-escondido');
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const doce = {
        nome: document.getElementById('nomeDoce').value,
        recheio: document.getElementById('RecheioDoce').value,
        sabor: document.getElementById('SaborDoce').value,
        cobertura: document.getElementById('CoberturaDoce').value,
        massa: document.getElementById('MassaDoce').value,
        tipo: document.getElementById('TipoDoce').value,
        dataValidade: document.getElementById('DataVDoce').value,
        dataFeito: document.getElementById('DataFnomeDoce').value,
    };

    try {
        await salvarDoce(doce);
        alert('Doce salvo com sucesso!');
        form.reset();
        modal.classList.add('container-escondido');
        await renderizarDoces(); // ← atualiza os cards após salvar
    } catch(erro) {
        console.error(erro);
        alert('Erro ao salvar!');
    }
});

// Função para renderizar um card individual de doce na tela
const criarCardDoce = (doce) => {
    const cartao = document.createElement('div');
    cartao.classList.add('card-doce');
    cartao.dataset.id = doce.id_doce;

    const conteudoCard = document.createElement('div');
    conteudoCard.classList.add('conteudo-card');

    const nome = document.createElement('h3');
    nome.textContent = doce.nome;

    const recheio = document.createElement('p');
    recheio.textContent = `Recheio: ${doce.recheio || ''}`;

    const sabor = document.createElement('p');
    sabor.textContent = `Sabor: ${doce.sabor || ''}`;

    const cobertura = document.createElement('p');
    cobertura.textContent = `Cobertura: ${doce.cobertura || ''}`;

    const massa = document.createElement('p');
    massa.textContent = `Massa: ${doce.massa || ''}`;

    const tipo = document.createElement('p');
    tipo.textContent = `Tipo: ${doce.tipo || ''}`;

    const dataValidade = document.createElement('p');
    dataValidade.textContent = `Validade: ${doce.dataValidade || ''}`;

    const dataFeito = document.createElement('p');
    dataFeito.textContent = `Feito em: ${doce.dataFeito || ''}`;

    conteudoCard.appendChild(nome);
    conteudoCard.appendChild(recheio);
    conteudoCard.appendChild(sabor);
    conteudoCard.appendChild(cobertura);
    conteudoCard.appendChild(massa);
    conteudoCard.appendChild(tipo);
    conteudoCard.appendChild(dataValidade);
    conteudoCard.appendChild(dataFeito);

    cartao.appendChild(conteudoCard);

    // Adiciona o card no container da tela
    document.getElementById('containerDoces').appendChild(cartao);
};

// Busca todos os doces e renderiza na tela
const renderizarDoces = async () => {
    const containerDoces = document.getElementById('containerDoces');
    
    // Remove os cards um por um de forma segura
    while (containerDoces.firstChild) {
        containerDoces.removeChild(containerDoces.firstChild);
    }

const doces = await buscarDoces();
if (!doces || doces.length === 0) return; // ← proteção
doces.forEach(doce => criarCardDoce(doce));
};

// Chama ao carregar a página
renderizarDoces();