var mongoose = require('mongoose'),
		Schema = mongoose.Schema; //Interactuar con la bd
var Fichas = new Schema({
    nombreDeCaja : String,
    atendido : Boolean,
    tiempoPorVentana : String,
		numberTicket: Number,
		ticket:String,
		dateTime: Date

}, {collection: 'FichasCollection'}); //llamar la tabla de la bd

mongoose.model('bankMod', Fichas); //Exporta la coleccion.
