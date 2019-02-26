
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/CEM2019',{ useNewUrlParser: true });
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    _id : mongoose.Types.ObjectId,
    rut : String,
    pnombre : String,
    snombre : String,
    appat : String,
    password : String,
    apmat : String,
    fechaNacimiento : String,
    username : String,
    email:String,
    fonoCelular:String,
    tipoUsuario:{type:Number,required:true},
    carrera:String,
    alumnoRegular:Boolean,
    Institucion:String
},{collection: 'Usuario'});

var dataUsers=mongoose.model('Usuario',UserSchema);

function TraerUsuarios(){
    
    return dataUsers.find();
}

function BorrarUsuario(idBorrar){
    console.log(idBorrar);
    var userDelete={_id:idBorrar}
    dataUsers.deleteOne(userDelete).then(function(err){

    });
}

function ExisteUsuario(user,pass){
    //console.log('los parametros de find son '+user+' y '+pass);
    return dataUsers.find({username:user,password:pass});
}

function CrearUsuario(user){
  //  console.log(user);
    return dataUsers.db.collection('Usuario').insertOne(user);
}



module.exports={
    TraerUsuarios,
    ExisteUsuario,
    CrearUsuario,
    BorrarUsuario
}