var express = require('express');
var router = express.Router();
var multer  = require('multer');

var photos_dir = process.env.PHOTOS_DIR || './media/';

var photoController = require('../controllers/photo_controller');

router.param('photoId',photoController.load); // autoload :photoId

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/photos', photoController.list);

router.get('/photos/new', photoController.new);

router.get('/photos/:photoId(\\d+)', photoController.show);

router.post('/photos', multer({inMemory: true}), photoController.create);

router.delete('/photos/:photoId(\\d+)', photoController.destroy);

module.exports = router;