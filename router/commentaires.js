const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();


const { Commentaires , schema } = require("../model/commentaires");


router.post("/", async function(req, res){
    const body = req.body;
    
    const verif = schema.validate(body);
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return ;
    }
    const commentaires = new Commentaires(body);
    const resultat = await commentaires.save(); 
    res.send(resultat);
});

router.get("/", async function(req, res){
    const resultat = await Commentaires.find() ;
    res.send(resultat);
});


router.get("/:id", async function(req, res){
    const id = req.params.id;

    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("id donné n'est pas conforme");
        return ;
    }
    
    const resultat = await Commentaires.find({_id : id});
    if(resultat.length === 0){
        res.status(404).send("Il n'y a aucun enregistrement avec l'id "+ id);
        return ;
    }
    
    res.send(resultat);
});


router.delete("/:id", async function(req, res){
    const id = req.params.id ;

    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("l'id transmis n'est pas conforme");
        return ;
    }
    const resultat = await Commentaires.deleteOne({ _id : id});
    
    if(resultat.deletedCount === 0){
        res.status(404).send("il n'existe pas d'enregistrement avec l'id" + id);
        return ;
    }

    const reponse = await Commentaires.find();
    res.send(reponse);
})

router.put("/:id", async function(req,res){

    const id = req.params.id ;
    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("id non conforme !");
        return ;
    }
    const body = req.body ;
    

    const verif = schema.validate(body); 
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }

    const resultat = await Commentaires.findById(id);
    if(!resultat){
        res.status(404).send("aucun enregistrement trouvé pour l'id "+ id);
        return ;
    }

    resultat.contenu = body.contenu;
    resultat.dateCreation = body.dateCreation;
    resultat.nomAuteur = body.nomAuteur;
    
    const reponse = await resultat.save();

    res.send(reponse);

});



module.exports = router;