const { validateToken } = require("../utils/authentication");

const checkForAuthenticationCookie = (cookieName) => {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!cookieName) return next();
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      return next();
    } catch (error) {
      return next();
    }
  };
};
module.exports = {
  checkForAuthenticationCookie,
};
