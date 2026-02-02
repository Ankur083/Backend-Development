const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userModel = require('./models/user')
const postModel = require('./models/post')

app.get('/', (req, res) =>{
    res.send('done');
})


app.get('/create', async (req, res) =>{

    let create = await userModel.create({
        username: "Ankur",
        age: 22,
        email: "abc@gmail.com"
    })
    res.send(create);
})

app.get('/post/create', async (req, res) =>{

    let post = await postModel.create({
        postdata: "Hello i am free now",
        user: "697f2c80a8fb9f59eec69585"

    })
    

    let user = await userModel.findOne({_id:"697f2c80a8fb9f59eec69585"});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
})

app.listen(3000);

