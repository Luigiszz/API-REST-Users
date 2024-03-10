fetch('http://localhost:3335', {method: 'GET'})
.then(response => {
    return response.text()
})
.then(data => {
    return console.log(data.toString())
})