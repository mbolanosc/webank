var PDFDocument = require('pdfkit');
var fs = require('fs');
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

    //Ruta de cajas pero con el cronometro. (PRUEBA)
    router.post('/serviceBoxList/:id',function (req,res){
      var routeId = req.params.id;
      var gettingDate = new Date();
      var h = gettingDate.getHours();
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      var m = addZero(gettingDate.getMinutes());
      console.log('routeId ', routeId);

      //find by id so that way i can edit the state
      Fichas.findById(routeId , function(err,docs){
        if(err){
          throw err;
         }
         //update info
         docs.atendido = true;
         docs.endTime = h;
         docs.endMinuts = m;
         //getting the strings number and parset into number
         var numberStartTime = parseInt(docs.initialMinuts);
         var numberEndTime = parseInt(docs.endMinuts);
         var result = numberStartTime - numberEndTime;
         docs.totalTime = result;
         docs.save(function(err){
           if (err) {
            throw err;
        }
          console.log('update with success!');
        });

        //CONSULTAS
        Fichas.find(function(err, fichas)	//Busca el modelo dentro del MVC
          {
            if (err) return next(err);
            //Cantidad de clientes atendidos en el día, generales y por ventanilla.
             var contAttend =1;
             for(var x=0; x<fichas.length; x++){
               console.log('T#$#$#', fichas[x].atendido);
               if(fichas[x].atendido === true){
                contAttend++;
               }
             }
             console.log('LO QUE EM IMREIDSDAS' ,contAttend);

          });
    });
      res.redirect('/serviceBoxList');
    })

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

    router.get('/pdfs/:file', function(req, res, next) {
      var file = req.params.file;
      console.log('jslagfuiwabfcij', file);
    });

var doc = new PDFDocument;
doc.pipe(fs.createWriteStream('app/views/pdfs/doc.pdf'));
doc.fontSize(25);
doc.text('Hola',100,80);

doc.end();
