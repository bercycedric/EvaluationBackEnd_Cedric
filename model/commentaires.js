const mongoose = require("mongoose");
const Joi = require("@hapi/joi")
    .extend(require('@hapi/joi-date'));

const schemaCommentaires = mongoose.Schema({
    contenu : String,
    dateCreation : {type : Date , default : Date.now },
    nomAuteur : String
});

const Commentaires = mongoose.model("commentaires", schemaCommentaires);

const schema = Joi.object({
    contenu : Joi.string().min(3).max(255).required(),
    nomAuteur : Joi.string().min(3).max(255).required()
});

module.exports.schema = schema;
module.exports.Commentaires = Commentaires;