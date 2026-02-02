const express = require('express');
const app = express();

const userModel = require('./usermodel');

app.get('/',(req,res) => {
    res.send('hey');
})

app.get('/create',async (req,res) => {
     let createduser = await userModel.create(
      
    {
        name: "Anmol",
        email: "anmol123@gmail.com",
        username: "anmol",
    }
);

    res.send(createduser);
});

app.get('/read',async (req,res) => {
     let user = await userModel.find()

    res.send(user);
});


app.get('/update',async (req,res) => {
     let updateduser = await userModel.findOneAndUpdate({username:"ankur"}, {name:"Ankur Raj"}, {new : true})

    res.send(updateduser);
});


app.get('/delete',async (req,res) => {
     let users = await userModel.findOneAndDelete({username : "anmol"})

    res.send(users);
});

app.listen(3000);