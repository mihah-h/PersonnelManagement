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
  const reqParams = req.query;
  if ('email' in reqParams){
    const user = base.users.find(function (user){
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
// app.get('/employees', (req, res) => res.status(200).json(base.companies));

//получение объекта employee с определенным полем email(если гарантируется, что email не повторяются у разных employee)
//в определенной компании, если в параметрах запроса указаны компания и почта; если указана только компания, то
//вернет всех сотрудников компании
app.get('/employees', (req, res) => {
  const reqParams = req.query;
  if ('company' in reqParams){
    const searchIndex = base.companies.findIndex(el => el.company === reqParams.company);
    if (searchIndex === -1) return res.sendStatus(404);
    if ('email' in reqParams){
      const employee = base.companies[searchIndex].employees.find(function (employee){
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
      res.status(200).json(base.companies[searchIndex].employees);
    }
  }
  console.log("ERROR");
  return res.sendStatus(404);
});

app.get('/optionsGroups', (req, res) => {
  const reqParams = req.query;
  if ('company' in reqParams){
    const searchIndex = base.companies.findIndex(el => el.company === reqParams.company);
    if (searchIndex === -1) return res.sendStatus(400);
    if ('option' in reqParams){
      const searchIndexOption = base.companies[searchIndex].options.findIndex(el => el.optionsGroupName === reqParams.option);
      if (searchIndexOption === -1) return res.sendStatus(400);
      res.status(200).json(base.companies[searchIndex].options[searchIndexOption]);
    }
    else{
      res.status(200).json(base.companies[searchIndex].options);
    }
  }
  else{
    console.log("ERROR");
    return res.sendStatus(400);
  }
});



app.post('/users/register', jsonParser, (req, res) => {
  console.log(req.body);
  if(!req.body) return res.sendStatus(400);
  const user = base.users.find(function (user){
    return user.email === req.body.email;
  });
  if (!user){
    if (req.body.status === "head"){
      const index = base.companies.findIndex(el => el.company === req.body.companyName);
      if (index === -1){
        base.companies.push({
          "company": req.body.companyName,
          "employees":[],
          "options":[{
            "optionsGroupNameRu": "Проект",
            "optionsGroupName": "project",
            "options": [],
          },
          {
            "optionsGroupNameRu": "Должность",
            "optionsGroupName": "position",
            "options": [],
          },
          {
            "optionsGroupNameRu": "Образование",
            "optionsGroupName": "education",
            "options": [],
          }
          ]
        });
      }
      else{
        console.log("ERROR");
        return res.sendStatus(400);
      }
    }
    base.users.push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
    return res.sendStatus(200);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(409);
  }
});

app.post('/users/auth', jsonParser, (req, res) =>
{
  console.log(req.body);
  if(!req.body) return res.sendStatus(400);
  const userIndex = base.users.findIndex(el => el.email === req.body.email);
  if (userIndex === -1){
    console.log("ERROR");
    return res.sendStatus(404);
  }
  if (base.users[userIndex].password === req.body.password){
    res.status(200).json(base.users[userIndex]);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(409);
  }
});

//отправляет employee, если он не повторяется в базе
app.post('/employees', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  if(!('company' in req.query)) return res.sendStatus(409);
  const searchIndex = base.companies.findIndex(el => el.company === req.query.company);
  if (searchIndex === -1) return res.sendStatus(404);
  const index = base.companies[searchIndex].employees.findIndex(el => el.email === req.body.email);
  if (index === -1){
    // req.body.age = String((new Date() - new Date(req.body.birthDate)).getFullYear());
    base.companies[searchIndex].employees.push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
    return res.sendStatus(200);
  }
  else{
    console.log("ERROR");
    return res.sendStatus(403);
  }
});

app.post('/optionsGroups', jsonParser, (req, res) => {
  console.log(req.body);
  if(!req.body) return res.sendStatus(400);
  const searchIndex = base.companies.findIndex(el => el.company === req.query.company);
  if (searchIndex === -1) return res.sendStatus(404);
  if (req.query.optionsGroupName){
    const optionIndex = base.companies[searchIndex].options.findIndex(el => el.optionsGroupName === req.query.optionsGroupName);
    if (optionIndex === -1) return res.sendStatus(404);
    if(base.companies[searchIndex].options[optionIndex].options.indexOf(req.query.option) === -1){
      base.companies[searchIndex].options[optionIndex].options.push(req.query.option.split('_').join(' '));
    }
    if(base.companies[searchIndex].options[optionIndex].options.indexOf(req.body.option) === -1){
      base.companies[searchIndex].options[optionIndex].options.push(req.body.option);
    }
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
    return res.sendStatus(200);
  }
  else{
    const optionIndex = base.companies[searchIndex].options.findIndex(el => el.optionsGroupName === req.body.optionsGroupName);
    if (optionIndex !== -1) return res.sendStatus(400);
    base.companies[searchIndex].options.push(req.body);
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
    return res.sendStatus(200);
  }
});


app.put('/employees', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(404);
  const searchIndexCompany = base.companies.findIndex(el => el.company === req.query.company);
  if (searchIndexCompany === -1){
    console.log("ERROR");
    return res.sendStatus(404);
  }
  const searchIndexEmployee = base.companies[searchIndexCompany].findIndex(el => el.email === req.query.email);
  if (searchIndexEmployee === -1){
    console.log("ERROR");
    return res.sendStatus(404);
  }
  else{
    base.companies[searchIndexCompany].employees[searchIndexEmployee] = req.body;
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
    return res.sendStatus(200);
  }
});

app.put('/users', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(404);
  const searchIndex = base.users.findIndex(el => el.email === req.query.email);
  if (searchIndex === -1){
    console.log("ERROR");
    return res.sendStatus(404);
  }
  else {
    if(Boolean(req.query.changePassword)){
      if (!req.body.password) return res.sendStatus(400);
      base.users[searchIndex].password = req.body.password;
    }
    if(Boolean(req.query.changeEmail)){
      if (!req.body.email) return res.sendStatus(400);
      const emailIndex = base.users.findIndex(el => el.email === req.body.email);
      if (emailIndex !== -1) return res.sendStatus(400);
      base.users[searchIndex].email = req.body.email;
    }
    if(Boolean(req.query.changeCompany)){
      if (!req.body.companyName) return res.sendStatus(400);
      const companyIndex = base.users.findIndex(el => el.companyName === req.body.companyName);
      if (companyIndex !== -1) return res.sendStatus(400);
      base.users[searchIndex].companyName = req.body.companyName;
    }
    else{
      base.users[searchIndex] = req.body;
    }
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
    return res.sendStatus(200);
  }
});

app.put('/optionsGroups', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  const searchIndex = base.companies.findIndex(el => el.company === req.query.company);
  if (searchIndex === -1) return res.sendStatus(400);
  const option = base.companies[searchIndex ].options.find(function (opt){
    return opt.optionsGroupName === req.body.optionsGroupName;
  });
  if (!option){
    console.log("ERROR");
    return res.sendStatus(400);
  }
  else {
    const newOptions = base.companies[searchIndex ].options.map((opt) => opt.optionsGroupName === req.body.optionsGroupName ? opt = req.body : opt );
    base.companies[searchIndex ].options = newOptions;
    base.companies[searchIndex].employees= newOptions;
    const json = JSON.stringify(base);
    fs.writeFileSync('dbImit/base.json', json);
    return res.sendStatus(200);
  }
});



app.delete('/employees', (req, res) => {
  if (!req.query.company) return res.sendStatus(400);
  if (!req.query.email) return res.sendStatus(400);
  const searchIndex = base.companies.findIndex(el => el.company === req.query.company);
  if (searchIndex === -1) return res.sendStatus(400);
  let clearedEmps = base.companies[searchIndex].employees.filter((emp) => emp.email !== req.query.email);
  base.companies[searchIndex].employees = clearedEmps ;
  const json = JSON.stringify(base);
  fs.writeFileSync('dbImit/base.json', json);
  return res.sendStatus(200);
});




app.listen(3000, () => console.log('listening port 3000'));
