
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
let ejs = require('ejs');

/*
*** Parse all form data
*/  
app.use(bodyParser.urlencoded({extended: false}));

/*
***@used for formatting dates
*/

var dateFormat = require('dateformat');
var now = new Date();

/*
* this is view engine
* Template parsing
* we are using EJS types
*
*/

app.set('view engine', 'ejs');

/****
    *
    *  Import all remated Javascript and css files to inject in our APP
    *
****/
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

/*connexion a notre base de donnée*/

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "text",
})
con.connect();

/*Global site title and base  url*/

const siteTitle = "projet";
const baseURL = "http://localhost:4000/"

/* charger avec les donnes de la base de donnee*/

app.get('/',function (req, res) {
	/* get the event list*/

	con.query("SELECT * FROM test",function (err, result){ 
		res.render('pages/accueil',{
			siteTitle : projet,
			pageTitle : "Liste des users",
			items : result
		});
	
	});

	
});

/*ajouter un utilisateur */
 
app.get('/event/add',function (req, res) {
	/* get the event list*/
res.render('pages/ajout_user',{
			siteTitle : siteTitle,
			pageTitle : "ajouter user",
			items : ''
		});
});

/* requete pour inserer dans la base de donnee*/
app.post('/event/add',function(req,res){

	var query = "INSERT INTO `test`(`nom`, `prenom`, `age`) VALUES (";
		query += " '"+req.body.nom+"',";
		query += " '"+req.body.prenom+"',";
		query += " '"+req.body.age+"')";

		con.query(query,function(err,result){
			res.redirect(baseURL);
		});
});
/* connection au serveur */

var server = app.listen(4000,function(){
	console.log("server started on 4000....");
}); 
