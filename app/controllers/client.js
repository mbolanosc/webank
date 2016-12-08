var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //global variables
    Fichas = mongoose.model('bankMod'),
    arrCajas = [],
    arrPlataforma = [],
    arrCredito = [],
    arrMarchamo = [],
    arrDiscapacidad = []
    newTicketClientes="";



module.exports = function(app) {
  app.use('/', router);
};

//Ruta de la  vista principal
router.get('/', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err, arrCajas, arrPlataforma, arrCredito, arrMarchamo, arrDiscapacidad);
      res.render('client', {
        title: 'Banco de la República Costarricense',
        cajas: 'Cajas',
        plataforma: 'Plataforma',
        credito: 'Crédito',
        Marchamo: 'Marchamo',
        Discapacidad: 'Personas con Discapacidad',
        arrCajas: arrCajas,
        arrPlataforma: arrPlataforma,
        arrCredito: arrCredito,
        arrMarchamo: arrMarchamo,
        arrDiscapacidad: arrDiscapacidad,
        newTicketClientes : newTicketClientes,
      });
    });
});

//Ruta de para obtener cupon
router.post('/getTicket', function(req, res) {
  var letterForTicketClients = "C",
  countTicketsClients = 0,
  currentTicket,
  typeOfTicket = req.body.ticket;

  //sumar la ficha
  if (typeOfTicket == "Cajas") {
    arrCajas.push(1);
  } else if (typeOfTicket == "Plataforma") {
    arrPlataforma.push(1);
  } else if (typeOfTicket == "Credito") {
    arrCredito.push(1);
  } else if (typeOfTicket == "Marchamo") {
    arrMarchamo.push(1);
  } else {
    arrDiscapacidad.push(1);
  }

  for (var i = 0; i < arrCajas.length; i++) {
    countTicketsClients += arrCajas[i];
  }
  for (var i = 0; i < arrPlataforma.length; i++) {
    countTicketsClients += arrPlataforma[i];
  }
  for (var i = 0; i < arrCredito.length; i++) {
    countTicketsClients += arrCredito[i];
  }
  for (var i = 0; i < arrMarchamo.length; i++) {
    countTicketsClients += arrMarchamo[i];
  }
  for (var i = 0; i < arrDiscapacidad.length; i++) {
    countTicketsClients += arrDiscapacidad[i];
  }
  newTicketClientes = letterForTicketClients+countTicketsClients
  console.log('nueva fichaaa', newTicketClientes);
  var newTicket = new Fichas({
    nombreDeCaja: typeOfTicket,
    atendido: false,
    tiempoPorVentana: "",
    ticket:newTicketClientes
  });
  console.log('new ticket  ', newTicket); //nuevo tiquete
  newTicket.save(function (err) {
    if (err){
      return handleError(err);
    }
    console.log('ya guardo el nuevo tiquete!');
  })
  //function para reireccionar la pagina despues de cierto tiempo
  function redirectTime() {
    setTimeout(function(){
      console.log("SET TIME OUT Para rideccionar ");
      res.redirect('/');
    }, 5000);
  }
  redirectTime();

});

// Ruta de cajas
router.get('/clientBoxList', function(req, res, next) {
  Fichas.find(function(err,fichas){
      if (err) return next(err, arrCajas);
      res.render('clientBox', {
        title: 'Banco de la República Costarricense',
        cajas: 'Cajas',
        arrCajas: arrCajas,
        // all tickets
        fichas:fichas,
      });
    });
});

//Ruta de cajas pero con el cronometro. (PRUEBA)
router.post('/clientBoxList/:id',function (req,res){
  console.log('Aqui hago la progra del cronometro y la guardo en la base de datos con route params');
  var routeId = req.params.id;
  console.log('routeId ', routeId);
  //find by id so that way i can edit the state

  /*Fichas.findById(routeId , function(err,docs){
    if(err){
      throw err;
    }
    docs.atendido = true;
    if(docs.atendido === true){
      console.log('ya es true ', docs.atendido);
    }else{
      console.log('no es true ', docs.atendido);
    }
    docs.save(function(err){
      if (err) {
        throw err;
      }
      console.log('update wt success!');
    });
  })
  //change the attend state from false to true
  res.redirect('/clientBoxList');*/
})


// Ruta de plataforma
router.get('/clientPlatformList', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err, arrCajas);
      res.render('clientPlatform', {
        title: 'Banco de la República Costarricense',
        plataforma: 'Plataforma',
        arrPlataforma: arrPlataforma
      });
    });
});

// Ruta de Credito
router.get('/clientCreditList', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err, arrCajas);
      res.render('clientCredit', {
        title: 'Banco de la República Costarricense',
        credito: 'Crédito',
        arrCredito: arrCredito
      });
    });
});

// Ruta de Marchamo
router.get('/clientMarchamoList', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err, arrCajas);
      res.render('clientMarchamo', {
        title: 'Banco de la República Costarricense',
        Marchamo: 'Marchamo',
        arrMarchamo: arrMarchamo
      });
    });
});

// Ruta de Personas con discapacidad
router.get('/clientDisabledPeopleList', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err, arrCajas);
      res.render('clientDisabledPeople', {
        title: 'Banco de la República Costarricense',
        Discapacidad: 'Personas con Discapacidad',
        arrDiscapacidad: arrDiscapacidad
      });
    });
});
