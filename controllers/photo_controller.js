var fs = require('fs');
//var photo_model = require('./../models/photo');
var models = require('../models');


// Autoload de photo asociado a :photoId
exports.load = function(req, res, next, photoId) {
    models.photos.findById(photoId)
  		.then(function(photo) {
      		if (photo) {
        		req.photo = photo;
        		next();
      		} else { 
      			throw new Error('No existe photoId=' + photoId);
      		}
        })
        .catch(function(error) { next(error); });
};
// Devuelve una lista de las imagenes disponibles y sus metadatos
exports.list = function (req, res,next) {
models.photos.findAll() // Busca la primera pregunta existente
		.then(function(photos) {
			if (photos) {
				res.render('photos/index', {photos: photos});
			}

			})
		.catch(function(error) { next(error); });
	//var photos = photo_model.photos;
	//res.render('photos/index', {photos: photos});
};

// Devuelve la vista del formulario para subir una nueva foto
exports.new = function (req, res,next) {
	var photo = models.photos.build({name:"",url:""});
	res.render('photos/new',{photo: photo});
};

// Devuelve la vista de visualización de una foto.
// El campo photo.url contiene la url donde se encuentra el fichero de audio
exports.show = function (req, res,next) {
	models.photos.findById(req.params.photoId) // Busca la primera pregunta existente
		.then(function(photo) {
			if (photo) {
				res.render('photos/show', {photo: req.photo}); 
			}
		    
		})
		.catch(function(error) { next(error); });
	
};

// Escribe una nueva foto en el registro de imagenes.
exports.create = function (req, res,next) {
	var photo = models.photos.build({name:req.body.photo.name,
								    url: req.body.url});
	//var photo = req.files.photo;
	var id = Math.random().toString(36).substr(2, 10);
	console.log('Nuevo fichero: ', req.body);
	console.log("Id"+ id);
	//var name = req.body.name;
	//var url = req.body.url;
	
	photo.save({fields:["id","name","url"]}).then(function(photo){
		res.redirect('/photos');
	})
	.catch(function(error){
		next(error);
	})
	// Escribe los metadatos de la nueva foto en el registro.
	//photo_model.photos[id] = {
	//	name: name,
	//	url: url
	//};

	
};

// Borra una foto (photoId) de la bbdd 
exports.destroy = function (req, res,next) {
	// Borra la entrada de la bbdd
	req.photo.destroy()
	.then(function(){
		console.log("The photo has been deleted");
		res.redirect('/photos');
	})
	.catch(function(error){
		console.log("Error deleting the photo");
		next(error);
	})
	var photoId = req.params.photoId;

	// Aquí debe implementarse el borrado del fichero de audio indetificado por photoId en photos.cdpsfy.es

	
	
};