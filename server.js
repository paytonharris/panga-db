var express = require('express');
var app = express();
const Joi = require('joi');
const { enemySchema } = require('./joiSchemas');
const { getEnemies, saveEnemy, deleteEnemy } = require('./db');

var port = process.env.PORT || 8080;

var router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to PangaDB API' });   
});

router.get('/enemies', async (req, res) => {
  const allEnemies = await getEnemies()

  res.json({
    allEnemies
   });
});
 
router.post('/enemy', async (req, res) => {
  try {
    var body = enemySchema.validate(req.body);

    if (body.error) {
      throw new Error("Invalid parameters");
    }
    
    await saveEnemy(body.value);

    return res.send('Success');
  } catch (error) {
    return res.send(`Something went wrong`);
  }
});
 
router.delete('/enemy', async (req, res) => {
  try {
    var name = Joi.string().validate(req.body.name);

    if (name.error) {
      throw new Error("Invalid parameters");
    }
    
    var deleted = await deleteEnemy(name.value);

    return res.send(`Deleted ${deleted.deletedCount} item(s)`);
  } catch (error) {
    return res.send(`Something went wrong`);
  }
});

app.use('/api', router);

app.listen(port, () =>
  console.log(`Listening on port ${port}`),
);
