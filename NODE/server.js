'use strict';

const express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3000;
const config = {
    rootPath : __dirname
};

const createUser = require('./crea_usuario')

//// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'agenda';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  require('./server/config/express')(app, config);
  require('./server/config/routes')(app, db);

  createUser(db);

  app.listen(PORT, () => { console.log(`Servidor funcionando en el puerto ${PORT}`); })

  //client.close();

});
