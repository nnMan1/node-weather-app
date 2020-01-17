const {Pool, Client} = require('pg')
const connectionString = 'postgressql://postgres:natasa12\@@localhost:5432/testDB'

const client = new Client({
    connectionString: connectionString,

})

client.connect()

client.query('insert into tablea1(name) values (\'Ana\')' , (err,res) => {
    console.log(err,res)
    client.end()
})

client.query('select * from tablea1', (err,res) => {
    console.log(err,res)
   client.end()
})