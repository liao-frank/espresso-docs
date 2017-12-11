/*
 * This model uses the Node.js MongoDB Driver.
 * To install:  npm install mongodb --save
 */
let mongoClient = require('mongodb').MongoClient,
	connection_string;
const DB_URL = 'ds259175.mlab.com:59175/intro-fliao',
	USERNAME = '67328';

// TODO - remove this before deploy... but not if lazy
connection_string = `mongodb://67328:67328@${DB_URL}`;

// if (process.env.MLAB_NAMEOFMYDB_PASSWD) {
// 	connection_string = `mongodb://${USERNAME}:`
// 		+ process.env.MLAB_PASSWD
// 		+ `@${DB_URL}`;
// }

// Global variable of the connected database
let mongoDB; 

// Use connect method to connect to the MongoDB server
if (connection_string) {
	mongoClient.connect(connection_string, function(err, db) {
		if (err) doError(err);
		console.log("Connected to MongoDB server at: " + connection_string);
		mongoDB = db; // Make reference to db globally available.
	});
}

function doError(err) {
	console.error("DB ERROR: " + err);
}

module.exports = (function() {
	function add(message, callback) {
		if (mongoDB) {
			mongoDB.collection('messages').insertOne(
				message, 
				function(err, status) {
					if (err) doError(err);
					let success = (status.result.n == 1 ? true : false);
					if (callback) callback(success);
				}
			);
		} else {
			if (callback) callback(false);
		}
	}

	function index(callback) {
		if (mongoDB) {
			mongoDB.collection('messages').find().toArray(function(err, docs) {
				if (err) doError(err);
				if (callback) callback(docs);
			});
		} else {
			if (callback) callback([]);
		}
	}

	return {
		add: add,
		index: index
	};
})();