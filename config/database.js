const {Pool, Client} = require('pg')
const connectionString = 'postgressql://postgres:natasa12\@@localhost:5432/elektro'

const client = new Client({
    connectionString: connectionString,
})

client.connect()

// client.query('insert into stanje(naziv) values (\'Ana\')' , (err,res) => {
//     console.log(err,res)
//     client.end()
// })

client.query('select * from stanje', (err,res) => {
    console.log(err,res)
   client.end()
})