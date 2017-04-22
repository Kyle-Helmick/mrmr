var express = require( 'express' ),
  router = express.Router();

/* GET home page. */
router.get( '/', function renderer( req, res, next ) {
  res.render( 'index', { title: 'Express' });
});

module.exports = router;
