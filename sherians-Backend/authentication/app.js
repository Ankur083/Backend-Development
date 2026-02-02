const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/create', (req,res)=>{
    let {username, email, password, age} = req.body;

    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password, salt, async (err, hash) =>{
           let createduser = await userModel.create({
                username,
                password: hash,
                email,
                age
            });

            let token = jwt.sign({email}, "shshsh");
            res.cookie('token', token);
            res.send(createduser)
        });
    });
});

app.get("/login", function(req,res){
    res.render('loginuser');
})

app.post("/login", async function(req,res){
    let user = await userModel.findOne({email: req.body.email})
    if(!user) return req.send('something is wrong');

    bcrypt.compare(req.body.password, user.password,function(err, result){
        if(result){
            let token = jwt.sign({email:user.email}, "shshsh");
            res.cookie('token', token);
           res.send("yes you can login") 
        }else{
            res.send("something went wrong")
        }
    })
});

app.get("/logout", function (req, res) {
    res.clearCookie('token');
    res.redirect('/');
});


app.listen(3000);