const form = document.querySelector('#novoItem');
const lista = document.querySelector('#lista');
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const tarefaExiste = document.querySelector('#existe');
const input = document.querySelector('#tarefa');


tarefas.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault()


    const tarefa = evento.target.elements['tarefa'];

    const existe = tarefas.find(elemento => elemento.item === tarefa.value);

    const tarefaAtual = {
        'item': tarefa.value,

    }




    if (existe) {
        tarefaAtual.id = existe.id;
        tarefaExiste.innerText = 'Item já existe.';
        input.classList.add('red_border');
    } else {
        tarefaAtual.id = tarefas[tarefas.length - 1] ? (tarefas[tarefas.length - 1]).id + 1 : 0;
        criaElemento(tarefaAtual);
        tarefas.push(tarefaAtual);
        tarefaExiste.innerText = '';
        input.classList.remove('red_border');
    }


    localStorage.setItem('tarefas', JSON.stringify(tarefas));



    tarefa.value = '';
    tarefa.focus();


});



function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('lista__item');
    novoItem.innerHTML += item.item;

    novoItem.dataset.id = item.id;

    novoItem.appendChild(botaoConcluido());
    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem);


}


function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';
    elementoBotao.classList.add('btn_deletar');

    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id);
    })



    return elementoBotao;
}





function deletaElemento(tag, id) {
    tag.remove();

    tarefas.splice(tarefas.findIndex(elemento => elemento.id === id), 1);


    localStorage.setItem('tarefas', JSON.stringify(tarefas));

}



function botaoConcluido() {
    const elementoConcluido = document.createElement('input');
    elementoConcluido.type = 'checkbox';
    elementoConcluido.classList.add('checkbox_concluido');

    elementoConcluido.addEventListener('click', function () {

        if (elementoConcluido.checked) {
            concluirTarefa(this.parentNode);
        } else {
            voltarTarefa(this.parentNode);
        }

    });

    return elementoConcluido;
}

function concluirTarefa(tag) {
    tag.classList.add('removido');
}

function voltarTarefa(tag) {
    tag.classList.remove('removido');
}