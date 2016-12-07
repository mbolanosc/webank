var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //Llama el modelo
    Fichas = mongoose.model('bankMod');

module.exports = function(app) {
  app.use('/', router);
};

//Ruta de la primera vista
router.get('/main', function(req, res, next) {

  Fichas.find(function(err) //Busca el modelo dentro del MVC
    {
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
