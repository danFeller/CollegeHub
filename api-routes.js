const apiRouter = require("koa-router")()
const session = require('koa-session')
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { oauth } = require('./config')

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
                callbackURL: 'http://localhost:3000/auth/google/callback',
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
        if (ctx.isAuthenticated()) {
            ctx.body = {
                message: 'User details',
                user: {
                    ...ctx.state.user
                },
                isAuthenticated: true,
            }
        } else {
            ctx.body = {
                message: "Welcome to Maverick Event Management World!",
                isAuthenticated: false
            }
        }
    });

    apiRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    apiRouter.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (ctx) => {
            ctx.redirect('/');
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