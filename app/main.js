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