const { MongoClient, ObjectID } = require('mongodb');

const url = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/"
const dbName = 'pangadb';
const enemies = 'enemies';

var getEnemies = () => {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(url);
    try {
      await client.connect();

      const db = client.db(dbName);
      const items = db.collection(enemies).find();

      resolve(await items.toArray());

    } catch (error) {
      reject(error);
    } finally {
      client.close();
    }
  });
}

var saveEnemy = (enemy) => {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(url);
    try {
      await client.connect();

      const db = client.db(dbName);
      db.collection(enemies).insertOne(enemy)

      resolve(true);
    } catch (error) {
      reject(error);
    } finally {
      client.close();
    }
  });
}

var deleteEnemy = (name) => {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(url);
    try {
      await client.connect();

      const db = client.db(dbName);
      const deleted = db.collection(enemies).deleteOne({ name })

      resolve(await deleted);
    } catch (error) {
      reject(error);
    } finally {
      client.close();
    }
  });
}

module.exports = { getEnemies, saveEnemy, deleteEnemy }