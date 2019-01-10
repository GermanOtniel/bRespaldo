const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const examenSchema = new Schema({
  curso:{
    type: Schema.Types.ObjectId,
    ref: "Curso"
  },
  intentos:[{
    ref: { 
      type:Schema.Types.ObjectId, 
      ref:"User"
    },
    numero:{
      type: Number,
      default: 0,
      min:0,
      required: true
    }
  }],
  pregunta1:{
    pregunta: String,
    respuestas:[{
      type: String,
      required: false,
      correcta: Boolean,
      respuestaInciso: String,
      respuestaNumero: Number
    }]
  },
  pregunta2:{
    pregunta: String,
    respuestas:[{
      type: String,
      required: false,
      correcta: Boolean,
      respuestaInciso: String,
      respuestaNumero: Number
    }]
  },
  pregunta3:{
    pregunta: String,
    respuestas:[{
      type: String,
      required: false,
      correcta: Boolean,
      respuestaInciso: String,
      respuestaNumero: Number
    }]
  },
  pregunta4:{
    pregunta: String,
    respuestas:[{
      type: String,
      required: false,
      correcta: Boolean,
      respuestaInciso: String,
      respuestaNumero: Number
    }]
  },
  pregunta5:{
    pregunta: String,
    respuestas:[{
      type: String,
      required: false,
      correcta: Boolean,
      respuestaInciso: String,
      respuestaNumero: Number
    }]
  }
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  module.exports  = mongoose.model('Examen', examenSchema);

