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
    				//1.Cantidad de clientes atendidos en el día, generales y por ventanilla.
    				 var contAttend =1;
    				 for(var x=0; x<fichas.length; x++){
    					 //para cajas
    					 if(fichas[x].atendido === true && fichas[x].nombreDeCaja === "Cajas" ){
    						contAttend++;
    					 }
    				 }
    				 console.log('Primera consulta' ,contAttend);
    				//2. Cliente que duró más y el que duró menos.
    				//3. Media de tiempo por ventanilla.
    				 var resultClients=0;
    				 var totalTimeClient=0;
    				 var totalTicketsCajas = 1;
    				 for(var x=0; x<fichas.length; x++){
    					 //para cajas
    					 if(fichas[x].nombreDeCaja === "Cajas" && fichas[x].atendido === true){
    							totalTicketsCajas++;
    							console.log('nonGlobalTime',fichas.totalTime);
    							//var nonGlobalTime = fichas[x].totalTime
    							//totalTimeClient +=	fichas[i].totalTime
    							//console.log("totalTimeClient @#@#@3" , totalTimeClient);
    					 }
    				 }
    				 console.log('acumule tiempo: ',totalTicketsCajas);
    				 //4. La ventanilla más eficiente y la menos eficiente.
    				 for(var y = 0;y<fichas.length;y++){

    				 }
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

    var doc = new PDFDocument;
     doc.pipe(fs.createWriteStream('app/views/pdfs/doc.pdf'));
     doc.fontSize(25);
     doc.text('Hola',100,80);
     doc.end();

    router.get('/pdfs', function(req, res) {
      console.log("Ruta yeah!!");

      res.setHeader('Content-disposition','attachment; filename = doc.pdf');
      res.setHeader('Content-type','application/pdf');
      res.download('app/views/pdfs' + '/doc.pdf');

    });
