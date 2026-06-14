const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

// Configure GitHub OAuth only if credentials exist
if (
process.env.GITHUB_CLIENT_ID &&
process.env.GITHUB_CLIENT_SECRET &&
process.env.CALLBACK_URL
) {
passport.use(
new GitHubStrategy(
{
clientID: process.env.GITHUB_CLIENT_ID,
clientSecret: process.env.GITHUB_CLIENT_SECRET,
callbackURL: process.env.CALLBACK_URL,
},
async (
accessToken,
refreshToken,
profile,
done
) => {
try {
return done(null, profile);
} catch (error) {
return done(error, null);
}
}
)
);
} else {
console.warn(
"GitHub OAuth credentials not configured."
);
}

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
done(null, user);
});

module.exports = passport;
