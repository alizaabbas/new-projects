/// the database table used is named bulletin_board, with 3 fields:
// user_id (primary key) , name (text) , message (text)


var pg = require('pg');
var express = require('express');
var app = express();

var bodyParser =  require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine' , 'ejs');
app.set('views' , './views');

//inserting into database
app.post('/bulletin', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_aliza', function(err, client, done){
    client.query(`insert into bulletin_board(name,message) values ('${req.body.name}' , '${req.body.message}')`, function(err, result){
     // console.log(err);
     // console.log('INSERT INTO users(name,email) values('+req.body.name+','+req.body.email+')')
     res.redirect('/bulletin');
     done();
     pg.end();
   })
  })

})

//getting one user
app.get('/bulletin/:user_id', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_aliza', function(err, client, done){
    var id = req.params.user_id;
    //console.log(user_id)
    client.query(`select * from bulletin_board where user_id='${id}'`, function(err,result){
      res.render('messageview', { user: result.rows[0]})
      //console.log(err);
     // console.log(result.rows);
     done();
     pg.end();
   })
  })
})

//delete a user

app.get('/delete/bulletin/:user_id', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_aliza', function(err, client, done){
    var id = req.params.user_id;
    client.query(`delete from bulletin_board where user_id='${id}'`, function(err, result){
     // console.log(err);
     // console.log(id);
     res.redirect('/bulletin');
     done();
     pg.end();
   })
  })
})

 //getting all users
 app.get('/bulletin', function(request, response){
  pg.connect('postgres://localhost:5432/ttp_aliza', function(err, client, done){
    client.query('select * from bulletin_board', function(err, result) {
      response.render('board', { data: result.rows});
    //  console.log(result.rows)
    done();
    pg.end();
  })
  })
})
/*
//updating messages in progress
app.get('/update/bulletin/:user_id', function(req,res){
  pg.connect('postgres://localhost:5432/ttp_aliza', function(err, client, done){
    var id = req.params.user_id;
    console.log(req.body.updatemessage);
    client.query(`UPDATE bulletin_board SET message = '${req.body.updatemessage}' where user_id='${id}';`, function(err, result){
     console.log(err);
      //console.log(user_id);
      res.render('messageview', { user: result.rows[1]});
      console.log(result.rows[1]);
      res.redirect('/bulletin');
      done();
      pg.end();
    })
  })
})
*/

app.listen(3000, function(){
  console.log("listening on port 3000");
})







