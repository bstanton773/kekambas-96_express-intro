const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.use(logger)

app.get('/', (req, res) => {
    console.log(req.test);
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

app.param('id', getUser);

app.get('/users/:id', (req, res) => {
    res.render('user', { user: req.user })
})

app.put('/users/:id', (req, res) => {
    res.send('Update User')
})

app.delete('/users/:id', (req, res) => {
    res.send('Delete User')
})

app.get('/test/:testId/:testName/:abc/:xyz', (req, res) => {
    console.log(req.params);
    res.send('Test')
})

function logger(req, res, next){
    console.log(req.originalUrl)
    req.test = 123
    next();
}

function getUser(req, res, next, id){
    for (let u of users){
        if (u.id == id){
            req.user = u
        }
    }
    if (req.user){
        next()
    } else {
        res.send({error: `No user with an id of ${id}`})
    }
}

app.listen(port, () => {
    console.log(`Hello World app listening on port ${port}`)
});
