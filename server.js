const express = require("express"); 
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors())

const database = {
    users: [ 
        {
            id: "1234",
            name: "maria",
            email: "mike@gmail.com",
            password: "olamundo"
        },
        {
            id: "321",
            name: "mike",
            email: "maria@gmail.com",
            password: "olamundo"
        }
    ], 

    login: [
        {
            login: [
            {
                id: '987',
                hash: "",
                email: "mike@gmail.com",
                password: "olamundo"
            }
            ]
        }
    ]
}

app.get("/", (req, res)=>{
    res.send(database.users)
})


app.post("/SignIn", (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
        res.json("success");
        console.log("ok")
    } else {
        res.status(400).json("error loggin in");
        console.log("not okay")
    }
    })


app.post("/register", (req, res) => {
    const { email, name, password } =  req.body;
     database.users.push({
        id: name,
        email: email,
        password: password,
        joined: new Date()
     })

     res.json(database.users[database.users.length-1]);

})


app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
           return res.json(user);
        }  
    })
    if (!found) {
        res.status(400).json("not found");
    }

})




bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});


app.listen(3002, ()=> {
console.log("app is runing on port 3002");
})



/*

route  /  - res = this is working
/ signin --> POST  success/fail 
/ Register --> POST = user
/ profile/:userid --> GET = user
/image --> PUT --> user   
*/