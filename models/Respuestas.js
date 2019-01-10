const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const respuestasSchema = new Schema({
  curso:{
    type: Schema.Types.ObjectId,
    ref: "Curso"
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  examen:{
    type: Schema.Types.ObjectId,
    ref: "Examen"
  },
  respuestas:[],
  calificacion:{
    type: Number,
    max: 10,
    min: 0,
    required: false
  },
  status:{
    type: String,
    enum: ["Pendiente","Aprobado","Reprobado"]
  }
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  module.exports  = mongoose.model('Respuestas', respuestasSchema);

