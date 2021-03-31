// Configure express app
const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;

// Connection URL to mongo (environment variable or default)
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

app.get('/', (req, res) => {
	MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
		if (err) {
			res.status(500).send('ERROR -->' + err);
		} else {
			res.send('Connection OK!');
			db.close();
		}
	});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
