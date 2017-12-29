const express=require('express');
const hbs=require('hbs');
const path = require('path');
const fs=require('fs');

var app=express();
console.log();
app.set('view engine',hbs);
//app.use('/static',express.static(path.join(__dirname ,'public')));

hbs.registerPartials(__dirname+'/views/partials/');
hbs.registerHelper('getCurrentYear',()=>{
	var year=new Date().getFullYear();
	return year;
});		
app.use((req,res,next)=>{
	var logInfo="Date : " + new Date() +" | Method : " + req.method+ " | URL : " + req.url; 
	console.log(logInfo);
	fs.appendFile('server.log',logInfo +'/n',(error)=>{
		if(error){	
		console.log("Error while loggig - "+ error);
		}
	})
	next();
});

app.use((req,res,next) =>{
	res.render('maintainence.hbs');
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageTitle:'Home'
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About'
	});
});

app.get('/help',(req,res)=>{
	res.send("HZzxzxc");
});

app.listen(3000,()=>{
    console.log("Server is up..");
});