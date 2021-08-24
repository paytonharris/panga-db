const Joi = require('joi');

const enemySchema = Joi.object({
  name: Joi.string()
    .required(),
  realName: Joi.string()
    .required(),
  phrase: Joi.string(),
  info: Joi.string(),
  pic: Joi.string()
})

module.exports = { enemySchema }