const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const notaSchema = new Schema({
  cuerpo: String,
  asunto: String,
  archivo: String,
  destinatario:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  destinatarios:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  leidoPor:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  remitenteOtro:{
    type:Schema.Types.ObjectId,
    ref:"Brand"
  },  
  remitente:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  evidenciaPertenece:{
    type:Schema.Types.ObjectId,
    ref:"Evidencia"
  },
  dinamica:{
    type: Schema.Types.ObjectId,
    ref:"Dinamica"
  },
  todos:{
    type:Boolean,
    required:true,
    default:false
  }
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });
  
  module.exports = mongoose.model('Nota', notaSchema);
// EL MODELO DE LAS NOTAS QUE SE CREAN CUANDO SE RECHAZA UNA EVIDENCIA O SE CREA UN MENSAJE GLOBAL
// SI ES UN MENSAJE GLOBAL EL ATRIBUTO TODOS ES TRUE