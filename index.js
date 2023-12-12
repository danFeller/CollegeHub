const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const config = require('./config')

const { apolloServer } = require('./server');
const {connectMongoDatabase} = require("./database/database");

const App = new Koa();
const port = process.env.PORT || 3000;
let httpServer

App.use(cors({
    origin: "http://localhost:2000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    credentials: true // allow session cookie from browser to pass through
}));


// Setup REST routes
require('./api-routes')(App)

async function startServer () {
    try {
        await apolloServer.start();
        apolloServer.applyMiddleware({app: App})
        httpServer = App.listen(port)
        console.log(`🚀 Server listening http://localhost:3000 🚀`);
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