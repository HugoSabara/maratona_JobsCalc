const express = require("express");
const server = express();
const routes = require("./routes");
const path   = require("path");


//setar uma config
server.set('view engine','ejs');

//mudar a localização da pasta
server.set('views', path.join(__dirname, 'views'));    

//habilitar arquivos statics.
server.use(express.static("public"));

//usar o req.body
server.use(express.urlencoded({extended:true}));

//Habilitar routas
server.use(routes);

server.listen(3000, ()=> console.log("Servidor Ok na porta 3000"));