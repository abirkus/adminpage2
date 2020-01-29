const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {google} = require('googleapis')
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */
//process.env.client_id, process.env.client_secret, process.env.redirect_uris

// clientID: process.env.client_id,
// clientSecret: process.env.client_secret,

// 				clientID: process.env.GOOGLE_CLIENT_ID,
// clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// callbackURL: process.env.GOOGLE_CALLBACK,

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
	const googleConfig = {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK,
	}

	const strategy = new GoogleStrategy(
		googleConfig,
		(token, refreshToken, profile, done) => {
			const googleId = profile.id
			//const name = profile.displayName
			const email = profile.emails[0].value

			let tkn = {}

			if (token) {
				tkn.access_token = token
			}
			if (refreshToken) {
				tkn.refresh_token = refreshToken
			}
			tkn = JSON.stringify(tkn)

			//console.log('TOKEN AFTER STRINGIFY', tkn)

			User.findOrCreate({
				where: {googleId},
				defaults: {email},
			})
				.then(([user]) => {
					user.update({token: tkn})
					return done(null, user)
				})
				.catch(done)
		}
	)

	//console.log('strategy', strategy)
	passport.use(strategy)

	const SCOPES = [
		'email',
		'https://www.googleapis.com/auth/gmail.readonly',
		'https://www.googleapis.com/auth/gmail.send',
		'https://www.googleapis.com/auth/gmail.modify',
		'https://www.googleapis.com/auth/gmail.compose',
		'https://www.googleapis.com/auth/contacts',
		'https://www.googleapis.com/auth/calendar',
	]
	//console.log('passport', passport)
	router.get('/', passport.authenticate('google', {scope: SCOPES}))

	// router.get(
	// 	'/googleclient',
	// 	passport.authenticate('google', {scope: SCOPES}),
	// 	function(req, res) {
	// 		console.log('req inside passport callback', req)
	// 		res.redirect('/account')
	// 	}
	// )

	router.get(
		'/callback',
		passport.authenticate('google', {failureRedirect: '/login'}),
		function(req, res) {
			res.redirect('/account')
		}
	)

	// router.get('/callback', async (req, res, next) => {
	// 	try {
	// 		console.log('req inside passport callback', req.query)
	// 		let resp = await req.passport.authenticate('google', {
	// 			successRedirect: '/account',
	// 			failureRedirect: '/login',
	// 		})
	// 		console.log('passport response', resp)
	// 		//res.send(resp)
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// })
}

router.use('/gmail', require('./gmail'))
router.use('/calendar', require('./calendar'))
router.use('/contacts', require('./contacts'))

// router.get('/googleclient', async (req, res, next) => {
// 	console.log('passport---', passport)

// 	// const googleClient = require('./googleclient')

// 	console.log('sample client', googleClient)
// 	const SCOPES = [
// 		'https://www.googleapis.com/auth/gmail.readonly',
// 		'https://www.googleapis.com/auth/gmail.send',
// 		'https://www.googleapis.com/auth/gmail.modify',
// 		'https://www.googleapis.com/auth/gmail.compose',
// 		'https://www.googleapis.com/auth/contacts',
// 		'https://www.googleapis.com/auth/calendar',
// 	]
// 	let link = await googleClient.getCode(SCOPES)
// 	res.send(link)
// })
