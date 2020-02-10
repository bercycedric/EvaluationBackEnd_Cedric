const mongoose = require("mongoose");
const Joi = require("@hapi/joi")
    .extend(require('@hapi/joi-date'));

const schemaArticles = mongoose.Schema({
    titre : String,
    contenu : String ,
    dateCreation : Date,
    nomAuteur : String,
    categories : [String],
    emailAuteur : String,
    estPublie : Boolean

});


const Articles = mongoose.model("articles", schemaArticles);

const schema = Joi.object({
    titre : Joi.string().min(3).max(255).required(),
    contenu : Joi.string().min(3).max(255).required(),
    dateCreation : Joi.date().format('YYYY-MM-DD'),
    nomAuteur : Joi.string().min(3).max(255).required(),
    categories : Joi.array().items(Joi.string()),
    emailAuteur : Joi.string().email().required(),
    estPublie : Joi.boolean().required()   
});

module.exports.schema = schema;
module.exports.Articles = Articles;