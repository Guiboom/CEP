const formulario = document.getElementById("CepForm");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    //sanitização de dados
    const cep = document.getElementById("cep").value.replace(/\D/g, "");
    if (cep.length != 8) {
        alert("CEP inválido, digite apenas 8 caracteres");
        return;
    }
    resultado.innerHTML = "Buscando...";
    try {
    const endereco = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await endereco.json();
    if(dados.erro){
        resultado.innerHTML="CEP inválido";
    }else{
        resultado.innerHTML="Rua: "+dados.logradouro+"<br>";
        resultado.innerHTML+="Cidade: "+dados.localidade+"<br>";
        resultado.innerHTML+="Estado: "+dados.estado+"<br>";
        resultado.innerHTML+="DDD: "+dados.ddd+"<br>";
        resultado.innerHTML+="regiao: "+dados.regiao+"<br>";
        resultado.innerHTML+="uf: "+dados.uf+"<br>";
        resultado.innerHTML+="Bairro: "+dados.bairro;
    }
    console.log(endereco)
    
    } catch {

    }

});