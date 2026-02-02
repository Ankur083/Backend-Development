const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



app.get('/', function(req, res){
    fs.readdir(`./files`,function(err, files){
        res.render("index",{files:files});
    })    
});




app.get('/files/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show', {filename: req.params.filename, filedata:filedata})
    });
    
});



app.get('/edit/:filename', function(req, res){

        res.render('edit', {filename:req.params.filename})
    
    
});

app.post('/edit', function(req, res){

    const oldFile = req.body.previous.trim();
    const newFile = req.body.new.trim();

    if (!newFile) {
        return res.redirect('/');
    }

    fs.rename(`./files/${oldFile}`,`./files/${newFile}.txt`,function(err){
            if (err) {
                console.error("Rename error:", err);
            }
            res.redirect('/');
    });
});


app.post('/create', function(req, res){
    if (!req.body.title || req.body.title.trim() === "") {
        return res.redirect('/');
    }
    fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`,req.body.details,function(err){
        if(err){
            console.error(err);
            res.redirect('/')
        }
        else{
            console.log('done');
            res.redirect('/')
        }
    });
    
});

// dynamic routing

// app.get('/profile/:username', function(req, res){
//     // req.params.username
//     res.send(`welcome,${req.params.username}`); 
// });
// app.get('/author/:username/:age', function(req, res){
//     // req.params.username
//     res.send(`welcome,${req.params.username} of age ${req.params.age}`); 
// });


app.listen(3000, function(){
    console.log("its running");
})

