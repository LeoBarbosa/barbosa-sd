function showForm() {
    console.log('showForm')
    document.querySelector('#intro').style.display = 'none';
    document.querySelector('form').style.display = 'flex';
}

function closeForm() {
    console.log('closeForm')
    document.querySelector('#intro').style.display = 'block';
    document.querySelector('form').style.display = 'none';
}

document.body.addEventListener('submit', (e) => {
    e.preventDefault();
    
    var ajax = new XMLHttpRequest();

    ajax.open("POST", "https://us-central1-barbosa-sd-d973a.cloudfunctions.net/enviarEmail", true);
    ajax.setRequestHeader("Content-type", "application/json");

    var form = document.querySelector('form');
    var data = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value,
        company: document.querySelector("input[name='company']").value,
        message: document.querySelector("textarea[name='message']").value
    };
    
    ajax.send(JSON.stringify(data));
    
    ajax.onreadystatechange = function () {

        // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
        if (ajax.readyState == 4 && ajax.status == 200) {

            var data = ajax.responseText;

            // Retorno do Ajax
            console.log(data);
        }
    }
    
    alert('Obrigado, em breve nossa equipe entrará em contato');
    closeForm();
});