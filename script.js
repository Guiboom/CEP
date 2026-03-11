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
        if (dados.erro) {
            resultado.innerHTML = "CEP inválido";
        } else {
            resultado.innerHTML = "Rua: " + dados.logradouro + "<br>";
            resultado.innerHTML += "Cidade: " + dados.localidade + "<br>";
            resultado.innerHTML += "Estado: " + dados.estado + "<br>";
            resultado.innerHTML += "DDD: " + dados.ddd + "<br>";
            resultado.innerHTML += "regiao: " + dados.regiao + "<br>";
            resultado.innerHTML += "uf: " + dados.uf + "<br>";
            resultado.innerHTML += "Bairro: " + dados.bairro;
            const cidade = dados.localidade
            const dadosGeo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json&countryCode=BR `);
            /* https://geocoding-api.open-meteo.com/v1/search?name=rio+do+sul&count=1&language=pt&format=json&countryCode=BR */
            const dadosGeoJson = await dadosGeo.json();
            if (dadosGeoJson.results && dadosGeoJson.length > 0) {
                const { latitude, longitude } = dadosGeoJson.results[0];
                /* console.log(latitude)
                console.log(longitude) */
                /* https://api.open-meteo.com/v1/forecast?latitude=-27.2142&longitude=-49.6431&current_weather=true */
                const clima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-${laltitude}&longitude=-${longitude}&current_weather=true`);
                const climaJson = await clima.json();
            } else {
                console.log("Não entrou")
            }

        }
        console.log(endereco)

    } catch (error) {
        resultado.innerHTML("Erro ao consultar o CEP")
    }

});