document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cep = document.getElementById('cepInput').value.replace(/\D/g, '');

    // Validação de CEP básico
    if (cep.length !== 8) {
        displayError();
        return;
    }

    // Exibir animação de carregamento
    toggleLoading(true);

    // Fazer a requisição para a API BrasilAPI
    fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.hasOwnProperty('erro')) {
                populateAddress(data);
            } else {
                displayError();
            }
        })
        .catch(() => displayError())
        .finally(() => toggleLoading(false));
});

// Função para exibir os dados do endereço
function populateAddress(data) {
    document.getElementById('cep').innerText = data.cep;
    document.getElementById('street').innerText = data.street || 'Não disponível';
    document.getElementById('neighborhood').innerText = data.neighborhood || 'Não disponível';
    document.getElementById('city').innerText = data.city;
    document.getElementById('state').innerText = data.state;

    document.getElementById('result').style.display = 'block';
    document.getElementById('error').style.display = 'none';
}

// Função para exibir mensagem de erro
function displayError() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

// Função para alternar o carregamento
function toggleLoading(isLoading) {
    document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
}
