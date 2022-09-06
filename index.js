const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {firstName: 'Brian', lastName: 'Stanton'});
})

let users = [
    {
        id: 1,
        username: 'brian',
        age: 55
    },
    {
        id: 2,
        username: 'tatyana',
        age: 34
    },
    {
        id: 3,
        username: 'ripal',
        age: 38
    }
]

app.get('/users', (req, res) => {
    res.render('users', { users })
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    for (let user of users){
        if (user.id == id){
            res.render('user', { user })
        }
    }
    res.send({error: `User with id ${id} does not exist`})
})

app.listen(port, () => {
    console.log(`Hello World app listening on port ${port}`)
});
