const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Spms@2002',
    database: 'testform',

});

app.post('/', async(req, res) => {
    const { Firstname, Lastname, email, phoneNumber, dob, gender, address, city, state, zip, country } = req.body;
    const val = [Firstname, Lastname, email, phoneNumber, dob, gender, address, city, state, zip, country]
    try {
        const k = await db.query('insert into users (Firstname,Lastname,mailid,phoneNumber,dob,gender,addressline,city,state,zip,country) values(?)', [val])
        console.log(k.rows);
    } catch (err) {
        console.error(err);
    }

    console.log(1111);
    console.log("yes");
    res.json({ msg: "success" })
})
app.get('/', async(req, res) => {
    try {
        const allForms = await db.query('SELECT * FROM users', (err, results, fields) => {
            console.log(results);
            res.json(results);
        });
    } catch (err) {
        console.error(err.message);
        res.json({ error: err.message });
    }
})
app.listen(3000, (req, res) => {
    console.log("Server is listening to port 3000...");
})