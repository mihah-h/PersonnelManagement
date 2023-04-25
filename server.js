const fs = require('fs');
const express = require('express');


const app = express();
//пока что только база зарегистрированных пользователей
let users = JSON.parse(fs.readFileSync('dbImit/user.json', 'utf8'));
const jsonParser = express.json();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

//запрос вида .get('http://localhost:3000/users').subscribe((data: User[]) => (this.users = data));
app.get('/users', (req, res) => res.status(200).json(users));

//запрос вида .post('http://localhost:3000/users', newUser).subscribe((data: User) => {console.log(data) (или что угодно ещё)});
app.post('/users', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    //расчитано на то, что будет получен объект пользователя
    users.push(req.body);
    const json = JSON.stringify(users);
    fs.writeFileSync('dbImit/user.json', json);
})


app.listen(3000, () => console.log('listening port 3000'));
