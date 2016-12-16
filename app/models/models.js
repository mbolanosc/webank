var mongoose = require('mongoose'),
		Schema = mongoose.Schema; //Interactuar con la bd
var Fichas = new Schema({
    nombreDeCaja : String,
    atendido : Boolean,
		startTime: Date,
		endTime: Date,
		totalTime: String,
		ticket:String


}, {collection: 'FichasCollection'}); //llamar la tabla de la bd

mongoose.model('bankMod', Fichas); //Exporta la coleccion.
