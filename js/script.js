
//envio das informações para o Google driver
const handleSubmit = (event) => {
    event.preventDefault();
    addloading();
    const nome = document.querySelector('input[ name = "nome"]').value;
    const email = document.querySelector('input[ name = "email"]').value;
    const telefone = document.querySelector('input[ name = "telefone"]').value;
    const cim = document.querySelector('input[ name = "cim"]').value;
    const numeroLJ = document.querySelector('input[ name = "numero_da_loja"]').value;
    const cep = document.querySelector('input[ name = "cep"]').value;
    const rua = document.querySelector('input[ name = "rua"]').value;
    const estado = document.querySelector('input[ name = "estado"]').value;
    const numero = document.querySelector('input[ name = "numero"]').value;
    const complemento = document.querySelector('input[ name = "complemento"]').value;
    const cidade = document.querySelector('input[ name = "cidade"]').value;
    const bairro = document.querySelector('input[ name = "bairro"]').value;

fetch("https://api.sheetmonkey.io/form/ezST96QMk1vwuWeaESVF2E", {

    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nome , email, cim, numeroLJ, cep, rua, numero, estado, cidade, bairro, complemento, telefone
            })
})


}

document.querySelector("form[name='01']").addEventListener('submit', handleSubmit )


// API de cep
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
    
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('estado').value=(conteudo.uf);
    
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('estado').value="...";
        

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
}

const button = document.querySelector('button');
const addloading = () => {
    button.innerHTML = '<img class="loading" src="./img/loading.png" >';
}

const removeloading = () => {
    button.innerHTML = 'Enviar';
}
