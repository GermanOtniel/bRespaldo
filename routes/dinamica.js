const router = require("express").Router();
const Dinamica = require("../models/Dinamica");
const Brand = require("../models/Brand");
const Marca = require("../models/Marca");
const Ventas = require("../models/Ventas");
const Centro = require("../models/CentroConsumo");


// AQUI ESTAN REVUELTAS UNAS SE USAN SOLO PARA EL DASHBOARD Y OTRAS PARA DASHBOARD Y PWA

// 1) DASHBOARD, CREAR DINAMICAS
router.post('/new',(req,res, next)=>{
  Dinamica.create(req.body)
  .then(dinamica=>{
    res.json(dinamica)
  })
  .catch(e=>next(e))
});

// 2) ESTA RUTA SE USA PARA TRAER TODAS LAS DINAMICAS EXISTENTES Y QUE SE REPRESENTEN EN LA 
// PWA Y EN EL DASHBOARD, 
//EN UN FUTURO QUERREMOS QUE:
//LA RUTA QUE REPRESENTE LAS DINAMICAS A UN USUARIO EN LA PWA
// SOLO LE REPRESENTE LAS DINAMICAS QUE TENGAN A SU CENTRO DE CONSUMO
// Y QUE EN EL DASHBOARD SOLO SE REPRESENTEN LAS QUE PERTENEZCAN AL BRAND DEL USUARIO DASHBOARD

// POR LO MIENTRAS SEGUIREMOS USANDO ESTA MISMA PARA AMBAS COSAS.
router.get('/',(req,res,next)=>{
  if(req.query.status === 'null' && req.query.brand === 'null'){
    Dinamica.find()
    .populate('brand')
    .populate('centroConsumo')
    .populate('marcas')
    .populate('evidencias','status')
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .then(dinamicas=>{
        let dinamicasPasadas = []
        let dinamicasNuevaFecha = []
        let mil = Date.now()
        let date = new Date(mil)
        for(let i = 0; i < dinamicas.length; i++){
          if(new Date(dinamicas[i].fechaFin) - date < 0 && dinamicas[i].activa === "Activa"){
            dinamicasPasadas.push(dinamicas[i]._id)
          }
          if( new Date(dinamicas[i].fechaFin) - date > 0 && dinamicas[i].activa === "Inactiva" ){
            dinamicasNuevaFecha.push(dinamicas[i]._id)
          }
        }
        Dinamica.updateMany({_id: dinamicasPasadas },{ $set: {"activa":"Inactiva"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        Dinamica.updateMany({_id: dinamicasNuevaFecha },{ $set: {"activa":"Inactiva"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        res.json(dinamicas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  }
  else if(req.query.status === 'null' && req.query.brand !== 'null'){
    Dinamica.find({brand:req.query.brand})
    .populate('brand')
    .populate('centroConsumo')
    .populate('marcas')
    .populate('evidencias','status')
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .then(dinamicas=>{
        let dinamicasPasadas = []
        let dinamicasNuevaFecha = []
        let mil = Date.now()
        let date = new Date(mil)
        for(let i = 0; i < dinamicas.length; i++){
          if(new Date(dinamicas[i].fechaFin) - date < 0 && dinamicas[i].activa === "Activa"){
            dinamicasPasadas.push(dinamicas[i]._id)
          }
          if( new Date(dinamicas[i].fechaFin) - date > 0 && dinamicas[i].activa === "Inactiva" ){
            dinamicasNuevaFecha.push(dinamicas[i]._id)
          }
        }
        Dinamica.updateMany({_id: dinamicasPasadas },{ $set: {"activa":"Inactiva"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        Dinamica.updateMany({_id: dinamicasNuevaFecha },{ $set: {"activa":"Inactiva"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        res.json(dinamicas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  }
  else if(req.query.status !== 'null' && req.query.brand === 'null'){
    Dinamica.find({activa:req.query.status})
    .populate('brand')
    .populate('centroConsumo')
    .populate('marcas')
    .populate('evidencias','status')
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .then(dinamicas=>{
        let dinamicasPasadas = []
        let dinamicasNuevaFecha = []
        let mil = Date.now()
        let date = new Date(mil)
        for(let i = 0; i < dinamicas.length; i++){
          if(new Date(dinamicas[i].fechaFin) - date < 0 && dinamicas[i].activa === "Activa"){
            dinamicasPasadas.push(dinamicas[i]._id)
          }
          if( new Date(dinamicas[i].fechaFin) - date > 0 && dinamicas[i].activa === "Inactiva" ){
            dinamicasNuevaFecha.push(dinamicas[i]._id)
          }
        }
        Dinamica.updateMany({_id: dinamicasPasadas },{ $set: {"activa":"Inactiva"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        Dinamica.updateMany({_id: dinamicasNuevaFecha },{ $set: {"activa":"Activa"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        res.json(dinamicas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  }
  else if(req.query.status !== 'null' && req.query.brand !== 'null'){
    Dinamica.find({activa:req.query.status,brand:req.query.brand})
    .populate('brand')
    .populate('centroConsumo')
    .populate('marcas')
    .populate('evidencias','status')
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .then(dinamicas=>{
        let dinamicasPasadas = []
        let dinamicasNuevaFecha = []
        let mil = Date.now()
        let date = new Date(mil)
        for(let i = 0; i < dinamicas.length; i++){
          if(new Date(dinamicas[i].fechaFin) - date < 0 && dinamicas[i].activa === "Activa"){
            dinamicasPasadas.push(dinamicas[i]._id)
          }
          if( new Date(dinamicas[i].fechaFin) - date > 0 && dinamicas[i].activa === "Inactiva" ){
            dinamicasNuevaFecha.push(dinamicas[i]._id)
          }
        }
        Dinamica.updateMany({_id: dinamicasPasadas },{ $set: {"activa":"Inactiva"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        Dinamica.updateMany({_id: dinamicasNuevaFecha },{ $set: {"activa":"Activa"}})
        .then(r=>{
        })
        .catch(e=>console.log(e))
        res.json(dinamicas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  }
})

// ruta para traer solo las dinamicas que correspondan con el centro de consumo del USUARIO APP
router.get('/pwa/:id',(req,res,next)=>{
  Dinamica.find({centroConsumo: req.params.id,status:"Aprobada",activa:"Activa"})
  .populate('brand')
  .populate('marcas')
  .populate({ path: 'marcaPuntosVentas._id', model: Marca })
  .then(dinamicas=>{
      res.json(dinamicas);
  })
  .catch(e=>{
      res.send('No funco papu...')
  })
})
// ruta para traer solo las dinamicas que correspondan con el BRAND del USUARIO DASHBOARD
router.get('/dash/:id',(req,res,next)=>{
  if(req.query.status === 'null'){
    Dinamica.find({brand: req.params.id})
    .populate('brand')
    .populate('centroConsumo')
    .populate('marcas')
    .populate('evidencias','status')
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .then(dinamicas=>{
      let dinamicasPasadas = []
      let dinamicasNuevaFecha = []
      let mil = Date.now()
      let date = new Date(mil)
      for(let i = 0; i < dinamicas.length; i++){
        if(new Date(dinamicas[i].fechaFin) - date < 0 && dinamicas[i].activa === "Activa"){
          dinamicasPasadas.push(dinamicas[i]._id)
        }
        if( new Date(dinamicas[i].fechaFin) - date > 0 && dinamicas[i].activa === "Inactiva" ){
          dinamicasNuevaFecha.push(dinamicas[i]._id)
        }
      }
      Dinamica.updateMany({_id: dinamicasPasadas },{ $set: {"activa":"Inactiva"}})
      .then(r=>{
      })
      .catch(e=>console.log(e))
      Dinamica.updateMany({_id: dinamicasNuevaFecha },{ $set: {"activa":"Activa"}})
      .then(r=>{
      })
      .catch(e=>console.log(e))
        res.json(dinamicas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  }
  else if(req.query.status !== 'null'){
    Dinamica.find({brand: req.params.id,activa:req.query.status})
    .populate('brand')
    .populate('centroConsumo')
    .populate('marcas')
    .populate('evidencias','status')
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .then(dinamicas=>{
      let dinamicasPasadas = []
      let dinamicasNuevaFecha = []
      let mil = Date.now()
      let date = new Date(mil)
      for(let i = 0; i < dinamicas.length; i++){
        if(new Date(dinamicas[i].fechaFin) - date < 0 && dinamicas[i].activa === "Activa"){
          dinamicasPasadas.push(dinamicas[i]._id)
        }
        if( new Date(dinamicas[i].fechaFin) - date > 0 && dinamicas[i].activa === "Inactiva" ){
          dinamicasNuevaFecha.push(dinamicas[i]._id)
        }
      }
      Dinamica.updateMany({_id: dinamicasPasadas },{ $set: {"activa":"Inactiva"}})
      .then(r=>{
      })
      .catch(e=>console.log(e))
      Dinamica.updateMany({_id: dinamicasNuevaFecha },{ $set: {"activa":"Activa"}})
      .then(r=>{
      })
      .catch(e=>console.log(e))
        res.json(dinamicas);
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  }
})

// 3) SE USA PARA DASHBORD Y PWA
// ME DA EL DETALLE DE CIERTA DINAMICA
router.get('/:id' ,(req,res)=>{
    Dinamica.findById(req.params.id)
    .populate({ path: 'marcaPuntosVentas._id', model: Marca })
    .populate('evidencias')
    .populate('centroConsumo')
    .then(dinamica=>{
      res.json(dinamica);
    })
  });


  // 4) SE USA EN LA PWA SOLAMENTE
  // CUANDO UN USUARIO CUMPLE CON LAS METAS DE CIERTA DINAMICA SE HABILITA UN BOTON CON ESTA
  //RUTA PARA QUE EL USUARIO SEA PUSHEADO A LA DINAMICA CORRESPONDIENTE COMO UN GANADOR
  router.post('/winner/:id' ,(req,res)=>{
    //console.log('BODY: ',req.body,'PARAMS: ',req.params.id)
    Dinamica.findByIdAndUpdate(req.params.id,{
      $push: { ganadores: req.body.winner }
      },{ 'new': true})
    .then(dinamica=>{
      Ventas.update({"dinamica": dinamica._id,"user":req.body.winner}, //query, you can also query for email
      {$set: {"status": "Canjeada"}},
      {"multi": true})
      .then(ventas=>{
        console.log(ventas)
      })
      .catch(e=>console.log(e))
      res.json(dinamica);
    })
    .catch(e=>console.log(e)) 
  });


  // 5) SE USA EN EL DASHBOARD, AUN TRABAJAREMOS MAS EN ELLA:
  
  // SI UN USUARIO HA TENIDO BUENAS VENTAS PERO AUN NO HA CUMPLIDO 
  //CON A META DE ALGUN PODUCTO PERO QUEREMOS PREMIARLO POR SU BUEN DESEMPEÑO
  // PODEMOS CONVERTIRLO EN GANADOR CON UN BOTON QUE HABILITA ESTA RUTA 
  router.post('/winnerdash/:id' ,(req,res)=>{
    //console.log('BODY: ',req.body,'PARAMS: ',req.params.id)
    Dinamica.findByIdAndUpdate(req.params.id,{
      $push: { ganadores: req.body._id }
      },{ 'new': true})
    .then(dinamica=>{
      // Ventas.update({"dinamica": dinamica._id}, //query, you can also query for email
      // {$set: {"status": "Canjeada"}},
      // {"multi": true})
      // .then(ventas=>{
      //   console.log(ventas)
      // })
      // .catch(e=>console.log(e))
      // res.json(dinamica);
    })
    .catch(e=>console.log(e)) 
  });

  // 6) SE USA EN LE DASHBOARD PARA EDITAR UNA DINAMICA

  router.post('/edit/:id',(req,res, next)=>{
    Dinamica.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(dinamica=>{
      res.json(dinamica);
    })
    .catch(e=>next(e));
  });

  // 7) SE USA EN EL DASHBOARD EN EL COMPONENTE DE DINAMICAS.JS PARA ELIMINAR UNA DINAMICA 
  router.delete('/delete/:id',(req,res,next)=>{
    Dinamica.findOneAndRemove({_id:req.params.id})
    .then(r=>{
      if(r.modalidad === "Ventas"){
        Ventas.remove({dinamica:req.params.id})
        .then(r=>{
          console.log(r)
        })
        .catch(e=>{
          console.log(e)
        })
      }
        res.json(r)
    })
    .catch(e=>console.log(e))
})

// 8) SE USA EN EL DASHBOARD PARA TRAER LAS DINAMICAS CORRESPONDIENTES DE UN BRAND Y QUE POSTERIORMENTE 
// SAQUE LOS CENTROS DE CONSUMO DE TODAS ESTAS DINAMICAS 
// PARA QUE A SU VEZ SAQUEMOS LOS IDS DE ESOS CENTROS DE CONSUMO Y TRAIGAMOS 
// A LOS USUARIOS QUE TENGAN ESOS IDS DE CENTROS DE CONSUMO COM SUS CENTROS DE CONSUMO
  router.get('/dashdinacentusers/:id',(req,res,next)=>{
    Dinamica.find({brand: req.params.id,activa:'Activa'})
    .then(dinamicas=>{
      let centros = []
        for(let i = 0; i < dinamicas.length; i++){
          for(let j =0; j < dinamicas[i].centroConsumo.length; j++ ){
            centros.push(dinamicas[i].centroConsumo[j])
          }
          }
        Centro.find({activo:"Activo"}).where('_id').in(centros)
        .populate('zona')
        .then(centros=>{
            res.json(centros)
        })
        .catch(e=>{
            res.json(e)
        })
    })
    .catch(e=>{
        res.send('No funco papu...')
    })
  })  
module.exports = router;
