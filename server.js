'use strict';
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var passport = require('passport');


var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('Views', __dirname + '/Views');
app.engine('html', require('ejs').renderFile);
app.use('/public', express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

var myStrategy = function(){ this.name = "mystrategy"; };
myStrategy.prototype.authenticate = function( req ) {
  //console.log( "called" );
  this.success( "user" );
};
passport.use( new myStrategy() );
passport.serializeUser( function( id, cb ){ cb( null, id ); });
passport.deserializeUser( function( id, cb ){ cb( null, id ); });


app.get('/',function(req,res){
  res.render("index.ejs");
});

app.get('/Login',function(req,res){
  res.render("Login.html");
});

app.get('/Registro',function(req,res){
  res.render("Registro.html");
});

app.get('/CrearUsuario',function(req,res){
  var pe=require('./Models/TipoUsuario');
  pe.TraerTodo().then(function(tipos){
    //console.log(doc);
    
    res.render("CrearUser.ejs",{tipoUsuario:tipos});
  });
  
});

app.get('/Programas',function(req,res){
  var pe=require('./Models/ProgramasEstudio');
  pe.TraerTodo().then(function(doc){
    //console.log(doc);
    res.render("Programas.ejs",{programas:doc});
  });
  
});

app.get('/admin',function(req,res){
    //console.log('estas autenticado');
    var Usuarios=require('./Models/Usuarios');
    var listaProgramas;
    var pe=require('./Models/ProgramasEstudio');
    pe.TraerTodo().then(function(progs){
      Usuarios.TraerUsuarios().then(function(doc){
        //console.log(progs);
        res.render("panelAdmin.ejs",{users:doc,programas:progs});
      });
    });
    
    
  
 // else{
  //  console.log('no esta autenticado');
  //  res.redirect('/login');
 // }
});



//REST API

app.get('/api/Usuarios',function(req,res){
  var Usuarios=require('./Models/Usuarios');
  Usuarios.TraerUsuarios().then(function(doc){
    res.send(doc);
  });
});

app.delete('/api/Usuarios/',function(req,res){
  var Usuarios=require('./Models/Usuarios');
  idBorrar=req.body.id;
  console.log('el id a borrar es: '+idBorrar);
  Usuarios.BorrarUsuario(idBorrar);
});

app.post('/api/Usuarios',function(req,res){
  var Usuarios=require('./Models/Usuarios');
  var estado=req.body.estado;
  if(estado==null){
    estado='Regular';
  }
  var user={
    "username" : req.body.username,
    "password" : req.body.password,
    "pNombre" : req.body.pnombre,
    "snombre" : req.body.snombre,
    "apellidop" : req.body.apellidop,
    "apellidom" : req.body.apellidom,
    "email" : req.body.email,
    "fonoCelular" : req.body.fonoCelular,
    "tipoUsuario" : req.body.tipoUsuario,
    "carrera" : req.body.carrera,
    "alumnoRegular" : estado,
    "Institucion" : req.body.Institucion
  }
  Usuarios.CrearUsuario(user);
  res.send('true');
});




app.get('/api/Instituciones',function(req,res){
  var Institucion=require('./Models/Institucion');
  Institucion.TraerInstituciones().then(function(doc){
    res.send(doc);
  });
});


app.post('/existeUser',function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  var Usuarios=require('./Models/Usuarios');

  Usuarios.ExisteUsuario(username,password).then(function(doc){
    console.log(doc);
    if(doc.length===1){
      passport.authenticate( "mystrategy",{
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
      } )
      console.log('autentico');
      
      res.send('true');
    }
    else{
      res.send('false');
    }
  });

  
});



app.get( "/auth", passport.authenticate( "mystrategy",{
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
} ), function( req, res ) {
  
})
.get( "/private", function( req, res ) {
  if ( req.isAuthenticated() ) {
    res.send( "Private data" );
  }
});

app.listen(PORT, function () {
   
});
