var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //global variables
    Fichas = mongoose.model('bankMod'),
    arrCajas = [],
    arrPlataforma = [],
    arrCredito = [],
    arrMarchamo = [],
    arrDiscapacidad = [],
    newTicketClientes="",
    //database thing
    dateTime = new Date();
    //interfaz thing
    var days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];

    var day = days[ dateTime.getDay() ];
    var month = months[ dateTime.getMonth() ];
    var dayNumber = dateTime.getDate();
    var dayYear = dateTime.getFullYear();
    //time lapse
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    var ticketInitialTime = dateTime.getHours();
    var m = addZero(dateTime.getMinutes());


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
        day:day,
        month:month,
        dayNumber:dayNumber,
        dayYear: dayYear
      });
    });
});

//Ruta de para obtener cupon
router.post('/getTicket', function(req, res) {
  var letterForTicketClients = "",
  countTicketsCajas = 0,
  countTicketsPlataforma = 0,
  countTicketsCredito = 0,
  countTicketsMarchamo = 0,
  countTicketsDescapacidad = 0,
  typeOfTicket = req.body.ticket;



  //sumar la ficha
  if (typeOfTicket == "Cajas") {
    arrCajas.push(1);
    letterForTicketClients = "C";
    for (var i = 0; i < arrCajas.length; i++) {
      countTicketsCajas += arrCajas[i];
    }
    newTicketClientes = letterForTicketClients + countTicketsCajas;
  } else if (typeOfTicket == "Plataforma") {
    arrPlataforma.push(1);
    letterForTicketClients = "P";
    for (var i = 0; i < arrPlataforma.length; i++) {
      countTicketsPlataforma += arrPlataforma[i];
    }
    newTicketClientes = letterForTicketClients + countTicketsPlataforma;
  } else if (typeOfTicket == "Credito") {
    arrCredito.push(1);
    letterForTicketClients = "R";
    for (var i = 0; i < arrCredito.length; i++) {
      countTicketsCredito += arrCredito[i];
    }
    newTicketClientes = letterForTicketClients + countTicketsCredito;
  } else if (typeOfTicket == "Marchamo") {
    arrMarchamo.push(1);
    letterForTicketClients = "M";
    for (var i = 0; i < arrMarchamo.length; i++) {
      countTicketsMarchamo += arrMarchamo[i];
    }
    newTicketClientes = letterForTicketClients + countTicketsMarchamo;
  } else {
    arrDiscapacidad.push(1);
    letterForTicketClients = "D";
    for (var i = 0; i < arrDiscapacidad.length; i++) {
      countTicketsDescapacidad += arrDiscapacidad[i];
    }
    newTicketClientes = letterForTicketClients + countTicketsDescapacidad;
  }

  var newTicket = new Fichas({
    nombreDeCaja: typeOfTicket,
    atendido: false,
    date: dateTime,
    startTime: ticketInitialTime,
    initialMinuts: m,
    endTime: "",
    endMinuts: "",
    totalTime: "",
    ticket:newTicketClientes
  });
  newTicket.save(function (err) {
    if (err){
      return handleError(err);
    }
    console.log('ya guardo el nuevo tiquete!');
  })
  console.log('nueva fichaaa', newTicketClientes);
  console.log('INITIAL HOUR', ticketInitialTime);
  //falta imprimir la fecha!
  res.send("Su número de tiquete es: " + "<br>" + newTicketClientes);

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
        fichas:fichas
      });
    });
});

router.post('/clientBoxList/:id',function (req,res){
  function others() {
    if (typeOfTicket != "Cajas") {
      var hideC = document.getElementById("others").style.display = 'hidden';
    }
  }
})


// Ruta de plataforma
router.get('/clientPlatformList', function(req, res, next) {
  Fichas.find(function(err,fichas){
      if (err) return next(err, arrPlataforma);
      res.render('clientPlatform', {
        title: 'Banco de la República Costarricense',
        plataforma: 'Plataforma',
        arrPlataforma: arrPlataforma,
        fichas:fichas
      });
    });
});



// Ruta de Credito
router.get('/clientCreditList', function(req, res, next) {
  Fichas.find(function(err, fichas){
      if (err) return next(err, arrCredito);
      res.render('clientCredit', {
        title: 'Banco de la República Costarricense',
        credito: 'Crédito',
        arrCredito: arrCredito,
        fichas:fichas
      });
    });
});



// Ruta de Marchamo
router.get('/clientMarchamoList', function(req, res, next) {
  Fichas.find(function(err, fichas){
      if (err) return next(err, arrMarchamo);
      res.render('clientMarchamo', {
        title: 'Banco de la República Costarricense',
        Marchamo: 'Marchamo',
        arrMarchamo: arrMarchamo,
        fichas:fichas
      });
    });
});



// Ruta de Personas con discapacidad
router.get('/clientDisabledPeopleList', function(req, res, next) {
  Fichas.find(function(err, fichas){
      if (err) return next(err, arrDiscapacidad);
      res.render('clientDisabledPeople', {
        title: 'Banco de la República Costarricense',
        Discapacidad: 'Personas con Discapacidad',
        arrDiscapacidad: arrDiscapacidad,
        fichas:fichas,
      });
    });
});
