
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/CEM2019',{ useNewUrlParser: true });
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    _id : mongoose.Types.ObjectId,
    indice:{type:Number,required:true},
    nombre:String
},{collection: 'TiposUsuario'});

var dataUsers=mongoose.model('TiposUsuario',UserSchema);

function TraerTodo(){
    
    return dataUsers.find();
}

module.exports={
    TraerTodo
}