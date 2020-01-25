const port = 3000;

var express = require('express')
var app = express()
var mysql = require('mysql')
var myConnection = require('express-myconnection')
var bodyparser = require('body-parser')
var config = require('./db.js')
var dbOptions = {
	host: config.database.host,
	username: config.database.username,
	password: config.database.password,
	port: config.database.port,
	db: config.database.db,
}

var route = require('./route/index')
var publicDir = (__dirname + '/public/');

app.use(express.static(publicDir))
app.use(myConnection(mysql, dbOptions, 'root'))
app.use(bodyparser.urlencoded({ encoded:true }))
app.use(bodyparser.json())
app.use("/",route)
app.listen(port, () => {
	console.log('running')
})








