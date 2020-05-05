const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");

const userService = new UserService();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await userService.tokenIsValid(decoded._id, token);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "User is not authenticated" });
  }
};
module.exports = auth;
