const { MongoClient, ServerApiVersion } = require('mongodb');
const {uri} = require("./../config");
const dbConfig = require("./dbConfig")

const collections = {}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectMongoDatabase() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db(dbConfig.dbName).command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        for (const config of dbConfig.collections) {
            const collection = client.db(dbConfig.dbName)
                .collection(config.name, {validator: config.validator})
            collections[config.name] = collection
            console.log(` Created collection: ${collection.collectionName}`)
        }

    } catch (error) {
        console.log(error)
        if (client) {
            await client.close(true)
        }
    }
}

module.exports = {
    client,
    connectMongoDatabase, collections
}