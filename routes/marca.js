const router = require("express").Router();
const Marca = require("../models/Marca");
const Brand = require("../models/Brand");
const Dinamica = require("../models/Dinamica");


// SE USAN SOLO EN EL DASHBOARD


router.post('/new',(req,res, next)=>{
  Marca.create(req.body)
  .then(marca=>{
      res.json(marca)
  })
  .catch(e=>next(e))
});

router.get('/',(req,res,next)=>{
  Marca.find()
  .populate('brand')
  .then(marcas=>{
      res.json(marcas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

router.get('/dash/:id',(req,res,next)=>{
  Marca.find({brand:req.params.id})
  .populate('brand')
  .then(marcas=>{
      res.json(marcas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})

router.delete('/delete/:id',(req,res,next)=>{
  Dinamica.find({"marcaPuntosVentas._id":req.params.id})
    .then(r=>{
      if(r.length === 0 ){
        Marca.findByIdAndRemove(req.params.id)
        .then(m=>{
          res.json("BORRADA")
        })
        .catch(e=>console.log(e))
      }
      else{
        res.json(r)
      }
    })
    .catch(e=>console.log(e))
})

router.post('/edit/:id',(req,res, next)=>{
  Marca.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(marca=>{
    res.json(marca);
  })
  .catch(e=>next(e));
});

module.exports = router;
