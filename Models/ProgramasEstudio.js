
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/CEM2019',{ useNewUrlParser: true });
var Schema=mongoose.Schema;

var ProgramaSchema=new Schema({
    _id : mongoose.Types.ObjectId,
    nombrePrograma : String,
    descripcion : String,
    imagenReferencial : String,
    cupos : Number,
    idCentro : String,
    tipoPeriodo : String,
    area : String,
    publicado : Boolean,
    fechaPublicacion:{type:Date,default: Date.now()}
},{collection: 'ProgramaEstudio'});

var dataPrograma=mongoose.model('ProgramaEstudio',ProgramaSchema);

function TraerTodo(){
    return dataPrograma.find();
}

module.exports={
    TraerTodo
}