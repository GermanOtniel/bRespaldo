const router = require("express").Router();
const Curso = require("../models/Curso");


// 1) CREAR UN NUEVO CENTRO DE CONSUMO
router.post('/new',(req,res, next)=>{
  Curso.create(req.body)
  .then(curso=>{
   res.json(curso)
  })
  .catch(e=>console.log(e))
});

router.get('/' ,(req,res)=>{
  Curso.find()
  .populate('brand','nombre')
  .populate('centros','nombre')
  .then(cursos=>{
    res.json(cursos);
  })
  .catch(e=>console.log(e))
});

router.get('/bybrand/:id' ,(req,res)=>{
  Curso.find({brand:req.params.id})
  .populate('brand','nombre')
  .populate('centros','nombre')
  .then(cursos=>{
    res.json(cursos);
  })
  .catch(e=>console.log(e))
});

router.post('/edit/:id',(req,res, next)=>{
  Curso.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(curso=>{
    res.json(curso);
  })
  .catch(e=>next(e));
});

module.exports = router;
