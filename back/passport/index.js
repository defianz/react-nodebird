const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      console.log(user);
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
