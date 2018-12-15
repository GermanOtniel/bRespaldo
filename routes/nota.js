const router = require("express").Router();
const Nota = require("../models/Nota");


router.post('/new',(req,res, next)=>{
  Nota.create(req.body)
  .then(nota=>{
      res.json(nota)
  })
  .catch(e=>next(e))
});

// 

router.get('/:id',(req,res,next)=>{
  Nota.find({destinatarios:req.params.id})
  .populate('remitente')
  .populate('remitenteOtro')
  .then(notas=>{
      res.json(notas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
// EN REALIDAD NO BORRA NOTAS SOLO LAS OCULTA A ESPECIFICO USUARIO 
router.post('/remove/:id',(req,res, next)=>{
    Nota.findById(req.params.id)
    .then(nota=>{
        let arrayDest = nota.destinatarios
        let element = req.body.idUser
        let index = arrayDest.indexOf(element)
        if (index > -1) {
            arrayDest.splice(index, 1);
          }
          Nota.findByIdAndUpdate(nota._id,{ $set: { "destinatarios" : arrayDest }, $push: { "leidoPor" : element}})
          .then(nota=>{
              res.json("Mensaje eliminado")
          })
          .catch(e=>console.log(e))
    })
    .catch(e=>next(e))
  });

router.delete('/delete/:id',(req,res,next)=>{
    Nota.findOneAndRemove({_id:req.params.id})
    .then(r=>{
        console.log(r)
    })
    .catch(e=>console.log(e))
})

router.get('/bybrand/:id',(req,res,next)=>{
    Nota.find({remitenteOtro:req.params.id})
    .populate('remitenteOtro','nombre')
    .populate('destinatarios','nombre apellido correo')
    .populate('leidoPor','nombre apellido correo')
    .populate('remitente','correo')
    .then(notas=>{
        res.json(notas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })

  router.get('/',(req,res,next)=>{
    Nota.find()
    .populate('remitenteOtro','nombre')
    .populate('destinatarios','nombre apellido correo')
    .populate('leidoPor','nombre apellido correo')
    .populate('remitente','correo')
    .then(notas=>{
        res.json(notas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })

module.exports = router;
