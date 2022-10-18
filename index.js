var express=require("express");
var bodyParser=require("body-parser");
var path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/usersDetails');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()
app.set('view engine', 'ejs');

app.use(bodyParser.json());
// app.use(express.static('static'));
app.use('/static',express.static(__dirname + '/static/'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var Fname = req.body.Fname;
    var Lname = req.body.Lname;
	var email =req.body.email;
	var phone =req.body.phone;
    var gender = req.body.gender;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var specialist = req.body.specialist;
    var adate = req.body.adate;

	var data = {
		"Fname": Fname,
        "Lname": Lname,
		"email":email,
		"phone":phone,
        "gender":gender,
        "city":city,
        "state":state,
        "zip":zip,
        "specialist":specialist,
        "adate":adate,
	}
db.collection('bookingInfo').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('signup_success.html');
})


app.get('/',function(req,res){
	res.set({
		'Access-control-Allow-Origin': '*'
		});
 	res.render('KH');
});

var server = app.listen(3000, function(){
    console.log('listening to port 3000')
});


console.log("server listening at port 3000");
