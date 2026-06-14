const router = require("express").Router();
const passport = require("passport");

// Login with GitHub
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.status(200).json({
      message: "GitHub authentication successful",
      user: req.user,
    });
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.status(200).json({
      message: "Logged out successfully",
    });
  });
});

// Current logged-in user
router.get("/current", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  res.status(200).json(req.user);
});

module.exports = router;