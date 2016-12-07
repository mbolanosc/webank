var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //Llama el modelo
    Fichas = mongoose.model('bankMod'),
    arrCajas = [];


module.exports = function(app) {
  app.use('/', router);
};

//Ruta de la  vista principal
router.get('/', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err, arrCajas);
      res.render('main', {
        title: 'Banco de la República Costarricense',
        cajas: 'Cajas',
        plataforma: 'Plataforma',
        credito: 'Crédito',
        Marchamo: 'Marchamo',
        Discapacidad: 'Personas con Discapacidad',
        arrCajas: arrCajas
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
    }
    for (var i = 0; i < arrCajas.length; i++) {
    countTicketsClients += arrCajas[i];
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





  res.redirect('/');
});
