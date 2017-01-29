var path = require('path');

//cargar modelo orm 
var Sequelize = require('sequelize');

//usar bbdd Sqllite
//var sequelize = new Sequelize(null,null,null,
//                     {dialect: "SqLite",storage: "cdpsserver.sqLite"});

//BBDD SQLite;
var url,storage;
if(!process.env.DATABASE_URL){
  url = "sqlite:///";
  storage = "cdpsserver.sqlite";
} else {
  url = process.env.DATABASE_URL;
  storage = process.env.DATABASE_URL || "";
}
var sequelize = new Sequelize(url,
                            {storage: storage,
                              omitNull: true
                            });

var photos_url = process.env.PHOTOS_URL || "http://localhost:8000"

// importar definición de la tabla de photo.js
var photos = sequelize.import(path.join(__dirname,'photo'));


// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
        // Ya se han creado las tablas necesarias.
        return photos.count().then(function (c) {
                    if (c === 0) { 
                          photos.create({name: 'Man',url: photos_url + '/photos/photo2.jpg'})
                          photos.create({name: 'Desktop',url: photos_url + '/photos/photo3.jpg'})
                          photos.create({name: 'Woman',url: photos_url + '/photos/photo4.jpg'}) 
                          photos.create({name: 'People',url: photos_url + '/photos/photo5.jpg'}) // la tabla se inicializa solo si está vacía
                        return photos.create({name: 'Wood',url: photos_url + '/photos/photo1.jpg'})
                                   .then(function() {
                                        console.log('Base de datos inicializada con datos');
                                    });
                    }
                });
    })
    .catch(function(error) {
        console.log("Error Sincronizando las tablas de la BBDD:", error);
        process.exit(1);
    });


exports.photos = photos; // exportar definición de tabla Quiz

