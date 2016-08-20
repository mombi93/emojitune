/*
    Module dependencies
*/
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const request = require('request');

/*
    Create app
 */
const app = express();

/*
    Basic setup
*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'client')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

/*
    Define your routes
*/
const router = express.Router();

router.post('/emojify', function(req, res) {

    /*
        Get the song name,
        get lyrics
        transform lyrics to emoji
     */

	console.log(`user requested text ${req.body.text} to be translated`);

	const emojifyData = {
		emoji_slova: req.body.text,
		emoji_kluc: 'fmgvzz.zrv',
		jezyk_s: 'en',
		jezyk_na: 'en-x-emoji',
		emoji_options: '-emoji_s_0-'
	};

	request.post({url:'http://emojitranslate.com/api/', formData: emojifyData}, (err, response, body) => {

		if (!err && response.statusCode == 200) {
			console.log(response.body);
			console.log('my body is ', body);
			res.json({
				response: body
			});
		} else {
            console.error(err);
            res.json({
    			response: 'error'
    		});
        }
	});
})

app.use('/', router);

/*
    Server error handling
*/
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err
	});
});

/*
    Start the server
*/
const debug = require('debug')('emojitune:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/*
    Helper functions
*/

// Normalize a port into a number, string, or false.

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

// Event listener for HTTP server "error" event.

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ?
		'Pipe ' + port :
		'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}


// Event listener for HTTP server "listening" event.

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ?
		'pipe ' + addr :
		'port ' + addr.port;
	debug('Listening on ' + bind);
}
