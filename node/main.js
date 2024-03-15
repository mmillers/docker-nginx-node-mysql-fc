const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  database: 'nodenginxdb',
  user: 'root',
  password: 'root',
};

const mysql = require('mysql2');

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
  console.log('BATEU AQUI');
  const name = faker.name.findName();

  connection.query(`INSERT INTO people (nome) VALUES ('${name}')`);

  connection.query(`SELECT nome FROM people`, (error, nomes, fields) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${nomes.map(item => `<li>${item.nome}</li>`).join('')}
      </ol>
    `);
  });
});

app.listen(port, () => {
  console.log('Listen on port:', port);
});