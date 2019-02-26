
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/CEM2019',{ useNewUrlParser: true });
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    _id : mongoose.Types.ObjectId,
    indice:{type:Number,required:true},
    nombre:String
},{collection: 'Carreras'});

var dataUsers=mongoose.model('Carrera',UserSchema);

function TraerTiposUsuario(){
    
    return dataUsers.find();
}

module.exports={
    TraerTiposUsuario
}