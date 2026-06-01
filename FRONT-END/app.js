/************************************************************************
 * Objetivo:Arquivo responsável pela comunicação com a API
 * Data:31/05/2026
 * Autor: Gabriel
 * version: 1.0
 ***********************************************************************/

const URL_BASE = 'https://api-estoque-doce.onrender.com/v1/doceriagoumert/'

export async function salvarDoce(doce) {
    const resposta = await fetch(URL_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doce)
    });   
    
    if(!resposta.ok) throw new Error ('Erro ao salvar doce');

    return await resposta.json();
}

export async function buscarDoces() {
    const resposta = await fetch(URL_BASE);
    if (!resposta.ok) throw new Error('Erro ao buscar doces');

    return await resposta.json();
    
}

export async function editarDoce(id, doce) {
    const resposta = await fetch(`${URL_BASE}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doce)
    });

    if(!resposta.ok) throw new Error ('Erro ao editar doce');

    return await resposta.json();
    
}

export async function deletarDoce(id) {
    const resposta = await fetch(`${URL_BASE}/${id}`,{
        method: 'DELETE'
    });
    
    if(!resposta.ok) throw new Error('Erro ao deletar doce');

}