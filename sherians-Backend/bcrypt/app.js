const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("Ankur", salt, function(err, hash) {
    //         storedHash = hash;   // save it
    //         console.log("Hash:", hash);
    //     });
    // });

    let token = jwt.sign({email: "Ankur@123gmail.com"}, "secret");
    res.cookie('token', token);
    res.send('done');
});


app.get('/read', (req, res) => {
    // bcrypt.compare("Ankur", storedHash, function(err, result) {
    //     console.log("Match:", result);
    // });
    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send('read page');
});


app.listen(3000);