const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
var GitHubApi = require('node-github')
var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App17" // GitHub is happy with a unique user agent
    }
})

const app = express();
const port = 3000;

app.use(session({
    secret: 'Wubba lubba dub dub',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static( 'public'));

// app.get('/', function(req,res,next){
//        res.sendfile('public/index.html', {root: __dirname })
// })

passport.use(new GitHubStrategy({
        clientID: '6f78b61660f07ddbce74',
        clientSecret: 'fc6c07b8b0a8a390c70b2b8706722bdaa4936f93',
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      session.user = profile;
      return done(null, profile);

    }
));

app.get('/auth/github',
    passport.authenticate('github', {
        scope: ['user:email']
    }));

app.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log(session.user)
        res.redirect('/#!/home');

    });
    app.get('/api/userinfo', function(req,res,next){
           res.send(session.user)
    })
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/api/github/following', function(req,res){
   github.user.getFollowingFromUser({
           user: session.user.username
     }, function(err, result){
        console.log(result)
        res.send(result)
      })
    })
