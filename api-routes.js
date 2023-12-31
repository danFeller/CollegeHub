const apiRouter = require("koa-router")()
const session = require('koa-session')
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { oauth, frontendURL } = require('./config')
const {collections} = require("./database/database");

module.exports = (App) => {

    App.keys = ['event-management-secret-key'];

    App.use(session(App));

    // Configure Passport
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(
        new GoogleStrategy(
            {
                clientID: oauth.client_id,
                clientSecret: oauth.client_secret,
                callbackURL: 'https://maverick-e24b493159d8.herokuapp.com/auth/google/callback'
            },
            (accessToken, refreshToken, profile, done) => {
                // In a real application, you would save user information to a database here.
                return done(null, profile);
            }
        )
    );

    App.use(passport.initialize());
    App.use(passport.session());

    apiRouter.get('/', async (ctx) => {
        ctx.body = {
            message: "Welcome to Maverick Event Management World!",
            isAuthenticated: false
        }
    })

    apiRouter.get('/login/success', async (ctx) => {
        if (ctx.isAuthenticated()) {
            ctx.body = {
                message: 'User details',
                user: {
                    firstName: ctx.state.user.name.givenName,
                    lastName: ctx.state.user.name.familyName,
                    email: ctx.state.user.email,
                    username: ctx.state.user.email,
                    provider: ctx.state.user.provider,
                    picture: ctx.state.user.picture,
                    events: []
                },
                isAuthenticated: true,
            }
            try {
                const existingUser = await collections.users.findOne({ email: ctx.body.user.email });
                if (existingUser) {
                    console.log('User already exists.');
                    ctx.body.user.id = existingUser._id
                } else {
                    const data = { user: ctx.body.user}
                    // Save the user if it doesn't exist
                    const user = await collections.users.insertOne(data.user)
                    ctx.body.user.id = user.insertedId
                    console.log('User saved to the collection.');
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            ctx.body = {
                isAuthenticated: false
            }
        }
    });

    apiRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    apiRouter.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' , successRedirect: 'https://maverickui-33d159bdad98.herokuapp.com/events'}),
        (ctx) => {
            const userInformation = {
                ... ctx.state.user
                // Add other relevant user information as needed
            };
        }
    );

    apiRouter.get('/logout', (ctx) => {
        ctx.logout();
        ctx.redirect('/');
    });

    // Disable caching
    App.use(async (ctx, next) => {
        await next()
        ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate')
        ctx.set('Pragma', 'no-cache')
        ctx.set('Expires', 0)
    })

    App.use(apiRouter.routes())
    App.use(apiRouter.allowedMethods());
}