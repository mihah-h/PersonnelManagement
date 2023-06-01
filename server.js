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
//получение всех объектов user, если через ? указан email, то поиск по email
app.get('/users', (req, res) =>
{
  reqParams = req.query;
  if ('email' in reqParams){
    let user = base.users.find(function (user){
      return user.email === reqParams.email;
    });
    if (!user){
      console.log("ERROR");
      return res.sendStatus(400);
    }
    else{
      res.status(200).json(user);
    };
  }
  else{
    res.status(200).json(base.users);
  };
});


//получение всех объектов employee
// app.get('/employees', (req, res) => res.status(200).json(base.employees));

//получение объекта employee с определенным полем email(если гарантируется, что email не повторяются у разных employee)
//в определенной компании, если в параметрах запроса указаны компания и почта; если указана только компания, то
//вернет всех сотрудников компании
app.get('/employees', (req, res) => {
  reqParams = req.query;
  if ('company' in reqParams){
    if ('email' in reqParams){
      let employee = base.employees[reqParams.company].find(function (employee){
        return employee.email === reqParams.email;
      });
      if (!employee){
        console.log("ERROR");
        return res.sendStatus(400);
      }
      else{
        res.status(200).json(employee);
      }
    }
    else{
      employeesInCompany = [];
      for (employee of base.employees[reqParams.company]){
        employeesInCompany.push(employee);
      }
      res.status(200).json(employeesInCompany);
    }
  }
});


//запрос вида .post('http://localhost:3000/users', newUser).subscribe((data: User) => {(*любая обработка*)});
//отправляет user, если он не повторяется в базе
app.post('/users', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let user = base.users.find(function (user){
    return user.email === req.body.email;
  });
  if (!user){
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
  let employee = base.employees[req.query.company].find(function (employee){
    return employee.email === req.body.email;
  });
  if (!employee){
    base.employees[req.query.company].push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(400);
  }
});


app.put('/employees', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let employee = base.employees[req.query.company].find(function (employee){
    return employee.email === req.body.email;
  });
  if (!employee){
    console.log("ERROR");
    return res.sendStatus(400);
  }
  else {
    const newEmployees = base.employees[req.query.company].map((emp) => emp.email === req.body.email ? emp = req.body : emp );
    base.employees[req.query.company] = newEmployees;
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
});

app.put('/users', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let user = base.users.find(function (user){
    return user.email === req.body.email;
  });
  if (!user){
    console.log("ERROR");
    return res.sendStatus(400);
  }
  else {
    const newUsers = base.users.map((u) => u.email === req.body.email ? u = req.body : u );
    base.users = newUsers;
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
});




app.listen(3000, () => console.log('listening port 3000'));
