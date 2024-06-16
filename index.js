const express = require('express')
const app = express()
const sql = require('sqlite3')
const PORT_NUMBER = 5000

const concert_database = new sql.Database('events.db', (err)=>{
    if(err){
        console.cog(err)
    }
    else{
        console.log('Database Open')
    }
})

app.listen(PORT_NUMBER, ()=>{
    console.log("Server started")
})

app.get('/', (req,res)=>{
    res.send('<h1>Hello from the server side</h1>')
})

app.get('/performances', (req,res) =>{
    const query = 'SELECT p.performer_name, p.i_url, pe.performance_time, s.stage_id'
    + ' FROM performance pe' 
    + ' INNER JOIN performer p ON pe.fk_p_id = p.p_id'
    + ' INNER JOIN stage s ON pe.fk_stage_id = s.stage_id;';
    concert_database.all(query,(err, result)=>{
        if(err){
            console.error(err)
        }
        else{
            res.json(result)
        }
    })
});

