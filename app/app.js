/**
 * Module dependencies
 */

var express = require('express'),
    financials = require('./models/financials')
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('error-handler'),
    morgan = require('morgan'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    engines = require('consolidate');
var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '/')));


var env = process.env.NODE_ENV || 'development';

// JSON API
app.get('/api/name', api.name);
app.post('/api/financials', financials.create);
app.get('/api/financials', financials.readFinancials);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
