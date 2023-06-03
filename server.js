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
      let employee = base.employees[reqParams.company].employeesInfo.find(function (employee){
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
      for (employee of base.employees[reqParams.company].employeesInfo){
        employeesInCompany.push(employee);
      }
      res.status(200).json(employeesInCompany);
    }
  }
});

app.get('/options', (req, res) => {
  reqParams = req.query;
  if ('company' in reqParams){
    if ('option' in reqParams){
      res.status(200).json(base.employees[reqParams.company].options[reqParams.option]);
    }
    else{
      res.status(200).json(base.employees[reqParams.company].options);
    }
  }
  else{
    console.log("ERROR");
    return res.sendStatus(400);
  }
});



app.post('/users/register', jsonParser, (req, res) => {
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
    return res.sendStatus(409);
  }
});

app.post('/users/auth', (req, res) =>
{
  if(!req.body) return res.sendStatus(400);
  const user = base.users.find(function (u){
    return u.email === req.body.email;
  });
  if (user && user.password === req.body.password){
    const token = jwt.sign(user, JWT_Secret);
    res.status(200).send({
      signed_user: user,
      token: token
    });
  }
  else{
    console.log("ERROR");
    return res.sendStatus(409);
  }
});

//отправляет employee, если он не повторяется в базе
app.post('/employees', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let employee = base.employees[req.query.company].employeesInfo.find(function (employee){
    return employee.email === req.body.email;
  });
  if (!employee){
    base.employees[req.query.company].employeesInfo.push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(400);
  }
});

app.post('/options', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  const option = base.employees[req.query.company].options.find(function (opt){
    return opt.optionsGroupName === req.body.optionsGroupName;
  });
  if (!option){
    base.employees[req.query.company].options.push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(409);
  }
});



app.put('/employees', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  let employee = base.employees[req.query.company].employeesInfo.find(function (employee){
    return employee.email === req.body.email;
  });
  if (!employee){
    console.log("ERROR");
    return res.sendStatus(400);
  }
  else {
    const newEmployees = base.employees[req.query.company].employeesInfo.map((emp) => emp.email === req.body.email ? emp = req.body : emp );
    base.employees[req.query.company].employeesInfo = newEmployees;
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

app.put('/options', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  const option = base.employees[req.query.company].options.find(function (opt){
    return opt.optionsGroupName === req.body.optionsGroupName;
  });
  if (!option){
    console.log("ERROR");
    return res.sendStatus(400);
  }
  else {
    const newOptions = base.employees[req.query.company].options.map((opt) => opt.optionsGroupName === req.body.optionsGroupName ? opt = req.body : opt );
    base.employees[req.query.company].options = newOptions;
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
  }
});




app.listen(3000, () => console.log('listening port 3000'));
