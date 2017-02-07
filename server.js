var express = require('express');
var bodyParser = require('body-parser');

var users = require('./users.json');
var middleware = require('./middleware.js');
var mainCtrl = require('./mainCtrl.js');

var app = express()
app.use(bodyParser.json())
app.use(middleware.addHeaders);
//works
// app.get('/api/users', function (req, res, next) {
//   res.status(200).json(users);
//
// })
//works
app.get('/api/user', mainCtrl.getUsers)
//works
// app.get('/api/users/:admin', mainCtrl.getPriviledge)
//works
app.get('/api/users/:Id', mainCtrl.getIdorAdmin)
//works
app.post('/api/users', middleware.generateId, mainCtrl.postUser)
//works
app.post('/api/users/:priv', middleware.adminName, middleware.generateId, mainCtrl.postUser)
//works
app.post('/api/users/language/:id', mainCtrl.putLanguage)
//works
app.post('/api/users/forums/:id', mainCtrl.putForum)
//works
app.delete('/api/users/forums/:id', mainCtrl.deleteForums)
//works
app.delete('/api/users/:id', mainCtrl.deleteUser)

const port = 3000;
app.listen(port, function() {
console.log(`listen to ${port}`);
})
module.exports = app;
