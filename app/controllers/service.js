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

router.get('/o', function(req, res) {
  Fichas.find(function(err, fichas) {

  });
});

//Inicio PDF
Fichas.find(function(err, fichas) {
  if (err) return next(err);
  //1.Cantidad de clientes atendidos en el día, generales y por ventanilla.
  var contAttend = 1;
  for (var x = 0; x < fichas.length; x++) {
    //para cajas
    if (fichas[x].atendido === true && fichas[x].nombreDeCaja === "Cajas") {
      contAttend++;
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

  //4. La ventanilla más eficiente y la menos eficiente.


  var doc = new PDFDocument;
  doc.pipe(fs.createWriteStream('app/views/pdfs/doc.pdf'));
  doc.fontSize(16);
  doc.text('Banco De La Republica Costarricense', 100, 80);
  doc.text('Cantidad de clientes atendidos en la ventanilla Caja: ' + contAttend, 100, 100);
  doc.text('Cantidad de clientes atendidos en la ventanilla Plataforma: ' + 0, 100, 120);
  doc.text('Cantidad de clientes atendidos en la ventanilla Crédito: ' + 0, 100, 140);
  doc.text('Cantidad de clientes atendidos en la ventanilla Marchamo: ' + 0, 100, 160);
  doc.text('Cantidad de clientes atendidos en la ventanilla Personas con Discapacidad: ' + 0, 100, 180);
  doc.text('Cliente que duro mas: ' +idMax+ " con el tiempo de " +maxNumber,  100, 220);
  doc.text('Cliente que duro menos: ' +idMin+ " con el tiempo de " +minNumber,  100, 260);
  doc.text('Media de tiempo por ventanilla de Cajas: ' + resultClients,  100, 300);

  doc.end();

});

//FIN PDF
//
router.get('/pdfs', function(req, res) {
  console.log("Ruta yeah!!");

  res.setHeader('Content-disposition', 'attachment; filename = doc.pdf');
  res.setHeader('Content-type', 'application/pdf');
  res.download('app/views/pdfs' + '/doc.pdf');

});
