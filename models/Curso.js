const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cursoSchema = new Schema({
  nombre:{
    type: String,
    required: true
  },
  descripcion:{
    type: String,
    required: true
  },
  imagen:{
    type: String,
    required: true
  },
  examen:{
    type: Boolean,
    default: false,
    required: true
  },
  aprobado:{
    type: Boolean,
    default: false,
    required: true
  },
  vencido: Boolean,
  archivoPdf: String,
  archivoYouTube: String,
  archivoImagenes:[],
  tipo:{
    type: String,
    enum: ["PDF","Imágenes","Video","Undefined"],
    default: "Undefined"
  },
  fechaVence: Date,
  brand:{
    type:Schema.Types.ObjectId,
    ref: "Brand"
  },
  enrolados:[{
    ref: { 
      type:Schema.Types.ObjectId, 
      ref:"User"
    },
    progreso:{
      type: Number,
      default: 0,
      min:0,
      required: true
    },
    fechaPrimerIngreso:{
      type: Date,
      required: false
    },
    fechaUltimoIngreso:{
      type: Date,
      required: false
    },
    tiempoDedicado:{
      type: String,
      required: false
    }
  }],
  centros:[{
    type: Schema.Types.ObjectId,
    ref: "CentroConsumo"
  }]
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  module.exports  = mongoose.model('Curso', cursoSchema);
