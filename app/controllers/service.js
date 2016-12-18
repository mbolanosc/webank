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
  Fichas.find(function(err) {
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
  Fichas.find(function(err) {
    if (err) return next(err);
    res.render('report', {
      title: 'Banco de la República Costarricense',
      newTicketClientes: newTicketClientes
    });
  });
});

// Ruta de cajas para listar
router.get('/serviceBoxList', function(req, res, next) {
  Fichas.find(function(err, fichas) {
    if (err) return next(err, arrCajas);
    res.render('serviceBox', {
      title: 'Banco de la República Costarricense',
      arrCajas: arrCajas,
      // all tickets
      fichas: fichas
    });
  });
});

//Ruta de cajas pero con el cronometro. (PRUEBA)
router.post('/serviceBoxList/:id', function(req, res) {
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
    Fichas.findById(routeId, function(err, docs) {
      if (err) {
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
      docs.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('update with success!');
      });

    });
    res.redirect('/serviceBoxList');
  })
  // Ruta de plataforma
router.get('/servicePlatformList', function(req, res, next) {
  Fichas.find(function(err, fichas) {
    if (err) return next(err, arrCajas);
    res.render('servicePlatform', {
      title: 'Banco de la República Costarricense',
      plataforma: 'Plataforma',
      arrPlataforma: arrPlataforma,
      fichas: fichas
    });
  });
});

router.post('/servicePlatformList/:id', function(req, res) {
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
    Fichas.findById(routeId, function(err, docs) {
      if (err) {
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
      docs.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('update with success!');
      });

    });
    res.redirect('/servicePlatformList');
  })

// Ruta de Credito
router.get('/serviceCreditList', function(req, res, next) {
  Fichas.find(function(err, fichas) {
    if (err) return next(err, arrCajas);
    res.render('serviceCredit', {
      title: 'Banco de la República Costarricense',
      credito: 'Crédito',
      arrCredito: arrCredito,
      fichas: fichas
    });
  });
});

router.post('/serviceCreditList/:id', function(req, res) {
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
    Fichas.findById(routeId, function(err, docs) {
      if (err) {
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
      docs.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('update with success!');
      });

    });
    res.redirect('/serviceCreditList');
  })

// Ruta de Marchamo
router.get('/serviceMarchamoList', function(req, res, next) {
  Fichas.find(function(err, fichas) {
    if (err) return next(err, arrCajas);
    res.render('serviceMarchamo', {
      title: 'Banco de la República Costarricense',
      Marchamo: 'Marchamo',
      arrMarchamo: arrMarchamo,
      fichas: fichas
    });
  });
});

router.post('/serviceMarchamoList/:id', function(req, res) {
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
    Fichas.findById(routeId, function(err, docs) {
      if (err) {
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
      docs.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('update with success!');
      });

    });
    res.redirect('/serviceMarchamoList');
  })

// Ruta de Personas con discapacidad
router.get('/serviceDisabledPeopleList', function(req, res, next) {
  Fichas.find(function(err, fichas) {
    if (err) return next(err, arrCajas);
    res.render('serviceDisabledPeople', {
      title: 'Banco de la República Costarricense',
      Discapacidad: 'Personas con Discapacidad',
      arrDiscapacidad: arrDiscapacidad,
      fichas: fichas
    });
  });
});

router.post('/serviceDisabledPeopleList/:id', function(req, res) {
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
    Fichas.findById(routeId, function(err, docs) {
      if (err) {
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
      docs.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('update with success!');
      });

    });
    res.redirect('/serviceDisabledPeopleList');
  })

router.get('/reportes', function(req, res) {
  res.render('reportes', {
    title: 'Banco de la República Costarricense'
  });
  Fichas.find(function(err, fichas) {
    if (err) return next(err);
    //1.Cantidad de clientes atendidos en el día, generales y por ventanilla.
    var contAttend = 0;
    for (var x = 0; x < fichas.length; x++) {
      //para cajas
      if (fichas[x].atendido === true && fichas[x].nombreDeCaja === "Cajas") {
        contAttend++;
      }
    }

    var contPlat = 0;
    for (var x = 0; x < fichas.length; x++) {
      //para cajas
      if (fichas[x].atendido === true && fichas[x].nombreDeCaja === "Plataforma") {
        contPlat++;
      }
    }

    var contCred = 0;
    for (var x = 0; x < fichas.length; x++) {
      //para cajas
      if (fichas[x].atendido === true && fichas[x].nombreDeCaja === "Credito") {
        contCred++;
      }
    }

    var contMar = 0;
    for (var x = 0; x < fichas.length; x++) {
      //para cajas
      if (fichas[x].atendido === true && fichas[x].nombreDeCaja === "Marchamo") {
        contMar++;
      }
    }

    var contDis = 0;
    for (var x = 0; x < fichas.length; x++) {
      //para cajas
      if (fichas[x].atendido === true && fichas[x].nombreDeCaja === "Discapacidad") {
        contDis++;
      }
    }

    //2. Cliente que duró más y el que duró menos.
    var arrData = [];
    var arrNum = [];
    var idMax,idMin;
    var maxNumber = 0, minNumber = 0;
    //formar arreglo de objetos.
    for (var i = 0; i < fichas.length; i++) {
      if (fichas[i].atendido === true) {
        var num = parseInt(fichas[i].totalTime)
        var obj = [{
          'id': fichas[i]._id,
          'num': num
        }]
        arrData.push(obj);
      }
    }
    arrData.map(function(data){
      var newNum = data[0].num;
      arrNum.push(newNum)
      minNumber = Math.max.apply(null,arrNum);
      maxNumber = Math.min.apply(null,arrNum);
    });
    arrData.map(function(dat){
      if (dat[0].num === maxNumber) {
        idMax= dat[0].id;
      }else {
        console.log("No lo encontro");
      }
      if (dat[0].num === minNumber) {
        idMin= dat[0].id;
      }else {
        console.log("No lo encontro");
      }
    });

    //3. Media de tiempo por ventanilla.
    var resultClients=0;
    var totalTimeClient=0;
    var totalTicketsCajas = 0;
    for(var x=0; x<fichas.length; x++){
      //para cajas
      if(fichas[x].nombreDeCaja === "Cajas" && fichas[x].atendido === true){
         totalTicketsCajas++;
         var numbers = parseInt(fichas[x].totalTime);
         totalTimeClient +=	numbers;
      }
    }
    resultClients = totalTimeClient / totalTicketsCajas;

    var resultPlat=0;
    var totalTimePlat=0;
    var totalTicketsPlat = 0;
    for(var x=0; x<fichas.length; x++){
      //para cajas
      if(fichas[x].nombreDeCaja === "Plataforma" && fichas[x].atendido === true){
         totalTicketsPlat++;
         var numbers = parseInt(fichas[x].totalTime);
         totalTimePlat +=	numbers;
      }
    }
    resultPlat = totalTimePlat / totalTicketsPlat;

    var resultCred=0;
    var totalTimeCred=0;
    var totalTicketsCred = 0;
    for(var x=0; x<fichas.length; x++){
      //para cajas
      if(fichas[x].nombreDeCaja === "Credito" && fichas[x].atendido === true){
         totalTicketsCred++;
         var numbers = parseInt(fichas[x].totalTime);
         totalTimeCred +=	numbers;
      }
    }
    resultCred = totalTimeCred / totalTicketsCred;

    var resultMar=0;
    var totalTimeMar=0;
    var totalTicketsMar = 0;
    for(var x=0; x<fichas.length; x++){
      //para cajas
      if(fichas[x].nombreDeCaja === "Marchamo" && fichas[x].atendido === true){
         totalTicketsMar++;
         var numbers = parseInt(fichas[x].totalTime);
         totalTimeMar +=	numbers;
      }
    }
    resultMar = totalTimeMar / totalTicketsMar;

    var resultDis=0;
    var totalTimeDis=0;
    var totalTicketsDis = 0;
    for(var x=0; x<fichas.length; x++){
      //para cajas
      if(fichas[x].nombreDeCaja === "Discapacidad" && fichas[x].atendido === true){
         totalTicketsDis++;
         var numbers = parseInt(fichas[x].totalTime);
         totalTimeDis +=	numbers;
      }
    }
    resultDis = totalTimeDis / totalTicketsDis;

    //4. La ventanilla más eficiente y la menos eficiente.


    var doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('app/views/pdfs/doc.pdf'));
    doc.fontSize(16);
    var totalTiquetsAttends = 0;
    totalTiquetsAttends = contAttend + contPlat + contCred + contMar + contDis;
    doc.text('Reportes BARECO', 245, 80);

    doc.text('Reporte de cantidad de tiquetes atendido por caja: ', 100, 150);
    doc.text('Ventanilla de Caja: ' + contAttend, 150, 180);
    doc.text('Ventanilla de Plataforma: ' + contPlat, 150, 200);
    doc.text('Ventanilla de Crédito: ' + contCred, 150, 220);
    doc.text('Ventanilla de Marchamo: ' + contMar, 150, 240);
    doc.text('Ventanilla de Personas con Discapacidad: ' + contDis, 150, 260);
    doc.text('Total de atendidos: ' + totalTiquetsAttends, 150, 280);

    doc.text('Reporte de duración de transacciones: ', 100, 320);
    doc.text('Transacción que tomó más tiempo fue: ' +idMax+ " con el tiempo de " +maxNumber,  150, 340);
    doc.text('Transacción que tomó menos tiempo fue: ' +idMin+ " con el tiempo de " +minNumber,  150, 380);

    doc.text('Reporte de media de tiempo por ventanilla: ' ,100, 440);
    doc.text('Ventanilla de Cajas: ' + resultClients,  150, 460);
    doc.text('Ventanilla de Plataforma: ' + resultPlat,  150, 480);
    doc.text('Ventanilla de Crédito: ' + resultCred,  150, 500);
    doc.text('Ventanilla de Marchamo: ' + resultMar, 150, 520);
    doc.text('Ventanilla de Personas con Discapacidad: ' + resultDis,  150, 540);

    doc.end();

  });
});

//Inicio PDF


//FIN PDF
//
router.get('/pdfs', function(req, res) {
  console.log("Ruta yeah!!");

  res.setHeader('Content-disposition', 'attachment; filename = doc.pdf');
  res.setHeader('Content-type', 'application/pdf');
  res.download('app/views/pdfs' + '/doc.pdf');

});
