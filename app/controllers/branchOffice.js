var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //Llama el modelo
    Fichas = mongoose.model('bankMod'),
    arrCajas = [],
    arrPlataforma = [],
    arrCredito = [],
    arrMarchamo = [],
    arrDiscapacidad = [];



module.exports = function(app) {
  app.use('/', router);
};

//Ruta de la  vista principal
router.get('/', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err, arrCajas, arrPlataforma, arrCredito, arrMarchamo, arrDiscapacidad);
      res.render('main', {
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
        arrDiscapacidad: arrDiscapacidad
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

  console.log('SELECCIONADO PARA FICHA ' , typeOfTicket);
  console.log('nueva ficha ', letterForTicketClients+countTicketsClients);
  console.log('ARREGLO ', arrCajas);
  var newTicket = new Fichas({
    nombreDeCaja: typeOfTicket,
    atendido: false,
    tiempoPorVentana: ""
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
