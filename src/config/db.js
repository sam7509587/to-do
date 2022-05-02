const { Client} = require('pg');
const client = new Client({
  user: 'pg4',
  host: 'localhost',
  database: 'todo',
  password: '1234',
  port: 5432,
})
client.connect().then(()=>{
    console.log("connected");
}).catch((err)=>console.log("not connected"));


module.exports = client;
