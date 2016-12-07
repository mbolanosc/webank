var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //Llama el modelo
    Fichas = mongoose.model('bankMod');

module.exports = function(app) {
  app.use('/', router);
};

//Ruta de la  vista principal
router.get('/', function(req, res, next) {
  Fichas.find(function(err){
      if (err) return next(err);
      res.render('main', {
        title: 'Banco de la República Costarricense',
        cajas: 'Cajas',
        plataforma: 'Plataforma',
        credito: 'Crédito',
        Marchamo: 'Marchamo',
        Discapacidad: 'Personas con Discapacidad'
      });
    });
});

//Ruta de para obtener cupon
router.post('/getTicket', function(req, res) {
  var letterForTicketClients = "C",
  var countTicketsClients = "001",
  var typeOfTicket = req.body.ticket;
  console.log('SELECCIONADO PARA FICHA ' , typeOfTicket);
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
