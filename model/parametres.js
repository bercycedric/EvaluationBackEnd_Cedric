const mongoose = require("mongoose");
const Joi = require("@hapi/joi")
    .extend(require('@hapi/joi-date'));

const schemaParametres = mongoose.Schema({
    information : String
});

const Parametres = mongoose.model("parametres", schemaParametres);

const schema = Joi.object({
    information : Joi.string().required()
});

module.exports.schema = schema;
module.exports.Parametres = Parametres;