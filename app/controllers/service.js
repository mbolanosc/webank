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

    //Ruta del servicio
    router.get('/service', function(req, res, next) {
      Fichas.find(function(err){
          if (err) return next(err, arrCajas, arrPlataforma, arrCredito, arrMarchamo, arrDiscapacidad);
          res.render('service', {
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

    // Ruta de reportes
    router.get('/reports', function(req, res, next) {
      Fichas.find(function(err){
          if (err) return next(err);
          res.render('report', {
            title: 'Banco de la República Costarricense',
            newTicketClientes: newTicketClientes
          });
        });
    });

    //Ruta de cajas pero con el cronometro. (PRUEBA)
    router.post('/serviceBoxList/:id',function (req,res){
      //stopwatch
          var seconds = 0, minutes = 0, hours = 0;
          var t;
          var totalTime;
          var contextHours,
              contextMinutes,
              contextSeconds;

          function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                  minutes = 0;
                  hours++;
                }
            }

            if(hours = (hours > 9)){
                hours = 0;
                contextHours= "00";
            }
            if(minutes = (minutes > 9)){
              minutes = 0;
              contextMinutes = "00";
            }
            if(seconds = (seconds > 9)){
              seconds:0;
              contextSeconds = "0"
            }
            timer();
          }

          function timer() {
            t = setTimeout(add, 1000);
            totalTime = seconds + '  ' + minutes;
            console.log('total de tiempo',totalTime);
          }
          /*
          start.onclick = timer;
          stop.onclick = function() {
              clearTimeout(t);
          }*/

        //change the attend state from false to true
        res.redirect('/serviceBoxList');
    });

// Ruta de cajas para listar
  router.get('/serviceBoxList', function(req, res, next) {
    Fichas.find(function(err,fichas){
          if (err) return next(err, arrCajas);
          res.render('serviceBox', {
            title: 'Banco de la República Costarricense',
            arrCajas: arrCajas,
            // all tickets
            fichas:fichas
          });
        });
    });
<<<<<<< HEAD
=======
    //Ruta de cajas pero con el cronometro. (PRUEBA)
    router.post('/serviceBoxList/:id',function (req,res){
      console.log('Aqui hago la progra del cronometro y la guardo en la base de datos con route params');
      var routeId = req.params.id;
      console.log('routeId ', routeId);
      //find by id so that way i can edit the state

    //   Fichas.findById(routeId , function(err,docs){
    //     if(err){
    //       throw err;
    //     }
    //     docs.atendido = true;
    //     if(docs.atendido === true){
    //       console.log('ya es true ', docs.atendido);
    //     }else{
    //       console.log('no es true ', docs.atendido);
    //     }
    //     docs.save(function(err){
    //       if (err) {
    //         throw err;
    //       }
    //       console.log('update wt success!');
    //     });
    // });

      //change the attend state from false to true
      res.redirect('/serviceBoxList');
    })
>>>>>>> 743ff4b2256a00d438c860ffa6dd5fa93af420e4

    // Ruta de plataforma
    router.get('/servicePlatformList', function(req, res, next) {
      Fichas.find(function(err){
          if (err) return next(err, arrCajas);
          res.render('servicePlatform', {
            title: 'Banco de la República Costarricense',
            plataforma: 'Plataforma',
            arrPlataforma: arrPlataforma
          });
        });
    });

    // Ruta de Credito
    router.get('/serviceCreditList', function(req, res, next) {
      Fichas.find(function(err){
          if (err) return next(err, arrCajas);
          res.render('serviceCredit', {
            title: 'Banco de la República Costarricense',
            credito: 'Crédito',
            arrCredito: arrCredito
          });
        });
    });

    // Ruta de Marchamo
    router.get('/serviceMarchamoList', function(req, res, next) {
      Fichas.find(function(err){
          if (err) return next(err, arrCajas);
          res.render('serviceMarchamo', {
            title: 'Banco de la República Costarricense',
            Marchamo: 'Marchamo',
            arrMarchamo: arrMarchamo
          });
        });
    });

    // Ruta de Personas con discapacidad
    router.get('/serviceDisabledPeopleList', function(req, res, next) {
      Fichas.find(function(err){
          if (err) return next(err, arrCajas);
          res.render('serviceDisabledPeople', {
            title: 'Banco de la República Costarricense',
            Discapacidad: 'Personas con Discapacidad',
            arrDiscapacidad: arrDiscapacidad
          });
        });
    });
