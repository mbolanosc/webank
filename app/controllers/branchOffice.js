var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //Llama el modelo
    Elecciones = mongoose.model('EstadosMod');

module.exports = function(app) {
  app.use('/', router);
};

//Ruta de la primera vista
router.get('/main', function(req, res, next) {

  Elecciones.find(function(err, estados) //Busca el modelo dentro del MVC
    {
      if (err) return next(err);
      res.render('main', {
        title: 'Banco de la República Costarricense',
        cajas: 'Cajas',
        plataforma: 'Plataforma',
        credito: 'Crédito',
        Marchamo: 'Marchamo',
        Discapacidad: 'Personas con Discapacidad',
        elecciones: estados,
      });
    });
});
