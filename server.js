const fs = require('fs');
const express = require('express');


const app = express();
let base = JSON.parse(fs.readFileSync('dbImit/base.json', 'utf8'));
const jsonParser = express.json();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});


//запрос вида .get('http://localhost:3000/users').subscribe((data: User[]) => (this.users = data));
//получение всех объектов user
app.get('/users', (req, res) => res.status(200).json(base.users));

//запрос вида .get('http://localhost:3000/users/email/...').subscribe((data: User[]) => (this.users = data));
//получение объекта user с определенным полем email(если гарантируется, что email не повторяются у разных user)
app.get('/users/email/:email', (req, res) => {
  let user = base.users.find(function (user){
    return user.email === req.params.email;
  });
  if (user === undefined){
    console.log("ERROR");
    return res.sendStatus(400);
  }
  else{
    res.status(200).json(user);
  }
});


//получение всех объектов employee
app.get('/employees', (req, res) => res.status(200).json(base.employees));

//получение объекта employee с определенным полем email(если гарантируется, что email не повторяются у разных employee)
app.get('/employees/email/:email', (req, res) => {
  let employee = base.employees.find(function (employee){
    return employee.email === req.params.email;
  });
  if (employee === undefined){
    console.log("ERROR");
    return res.sendStatus(400);
  }
  else{
    res.status(200).json(employee);
  }
});

//получение всех объектов employee определенным параметром company
app.get('/employees/company/:company', (req, res) => {
  employeesInCompany = [];
  for (employee of base.employees){
    if (employee.company === req.params.company){
      employeesInCompany.push(employee);
    }
  }
  res.status(200).json(employeesInCompany);
});


//запрос вида .post('http://localhost:3000/users', newUser).subscribe((data: User) => {(*любая обработка*)});
//отправляет user, если он не повторяется в базе
app.post('/users', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let user = base.users.find(function (user){
    return user.email === req.body.email;
  });
  if (user === undefined){
    base.users.push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(400);
  }
});

//отправляет employee, если он не повторяется в базе
app.post('/employees', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let employee = base.employees.find(function (employee){
    return employee.email === req.body.email;
  });
  if (employee === undefined){
    base.employees.push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(400);
  }
});




app.listen(3000, () => console.log('listening port 3000'));
