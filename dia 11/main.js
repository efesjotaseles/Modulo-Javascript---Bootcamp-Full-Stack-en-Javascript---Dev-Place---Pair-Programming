let url = 'https://jsonplaceholder.typicode.com/users/9';

fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))

const mostrarData = (data) => {
    console.log(data)
    let body = '';
    for (let i = 0; i<data.length; i++){
        body += `<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].username}</td><td>${data[i].email}</td><td>${data[i].address.street}</td></tr>`
    }
    document.getElementById('data').innerHTML = body;
}