/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , logger = require('morgan') ;


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
//app.use(express.logger('dev'))
app.use(logger()) ;
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
}) ;

app.get('/profile.html', function (req,res) {
  res.render('profile',
       { title : 'User Profile' }
     )
  }) ;

app.get('/bootstrap.html', function (req,res) {
  res.render('bootstrap',
       { title : 'Bootstrap with jade' }
     )
  }) ;

app.listen(3000, function () {
console.log('Listening...') ;
})
