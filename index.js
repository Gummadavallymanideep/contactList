const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

const port = 8000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name : "Arpon",
        phone : "1111111111"
    },
    {
        name : "Tony Stark",
        phone : "1234567890"
    },
    {
        name : "Coding Ninjas",
        phone : "2316537634"
    },
    {
        name : "Manideep",
        phone : "9866035832"
    }
]

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fectching contacts from db');
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list : contacts
        });
    });
});

app.get('/pratice', function(req,res){
    return res.render('pratice', {
        title: "Let us play with ejs"
    });
});

app.post('/create-contact', function(req,res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
             console.log('Error in creating a contact!');
            return;
        }
        console.log('**********',newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact', function(req,res){
    console.log(req.query);
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleteing the Object');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('yup! My Server is running on port', port);
})