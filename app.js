const express = require("express");
const mongoose = require("mongoose");
const routerArticles = require("./router/articles");
const routerCommentaires = require("./router/commentaires");
const routerUtilisateurs = require("./router/utilisateurs");
const routerParametres = require("./router/parametres");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/articles",routerArticles );
app.use("/commentaires",routerCommentaires );
app.use("/utilisateurs",routerUtilisateurs );
app.use("/parametres",routerParametres );

const urlBDD = "mongodb+srv://ifocop_admin:azerty1234@cluster0-62zc5.mongodb.net/test?retryWrites=true&w=majority";



const optionConnexion = {
    useNewUrlParser : true ,
    useUnifiedTopology: true
};

mongoose.connect(urlBDD , optionConnexion)
        .then(function(){
            console.log("Connexion à la base de donnée est réussie");
        })
        .catch(function(err){
            console.log(err);
        })


const port = process.env.PORT || 9540 ;

app.listen(port , function(){ 
    console.log("serveur lancé sur le port " + port);
});

