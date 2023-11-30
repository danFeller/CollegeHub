const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");

const { apolloServer } = require('./server');
const {connectMongoDatabase} = require("./database/database");

const App = new Koa();
const port = 3000;
let httpServer

App.use(parser()).use(cors());

// Setup REST routes
require('./api-routes')(App)

async function startServer () {
    try {
        await apolloServer.start();
        apolloServer.applyMiddleware({app: App})
        httpServer = App.listen(port)
        console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
        await connectMongoDatabase()
        console.log("Successfully connected to the database")
        return httpServer
    } catch (error) {

    }
}

if (require.main === module) {
    startServer().catch(async error => {
        console.log(error)
        process.exit(1)
    })
}