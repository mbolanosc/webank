var mongoose = require('mongoose'),
		Schema = mongoose.Schema; //Interactuar con la bd
var Fichas = new Schema({
    nombreDeCaja : String,
    atendido : Boolean,
		date: Date,
		startTime: String,
		initialMinuts: String,
		endTime: String,
		endMinuts:String,
		totalTime: String,
		ticket:String


}, {collection: 'FichasCollection'}); //llamar la tabla de la bd

mongoose.model('bankMod', Fichas); //Exporta la coleccion.
