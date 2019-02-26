
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/CEM2019',{ useNewUrlParser: true });
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    _id : mongoose.Types.ObjectId,
    nomInstitucion : {type:String, required:true}
},{collection: 'Institucion'});

var dataUsers=mongoose.model('Institucion',UserSchema);

function TraerInstituciones(){
    return dataUsers.find();
}

module.exports={
    TraerInstituciones
}