const express = require("express");
const UserController = require("../controllers/UserController");
const auth = require("../middleware/auth");

const userController = new UserController();
const routes = express.Router();

routes.post("/user/create", async (req, res, next) => {
  userController.createUser(req, res, next);
});

routes.post("/user/login", async (req, res, next) => {
  userController.login(req, res, next);
});

routes.post("/user/logout", auth, (req, res, next) => {
  userController.logout(req, res, next);
});

routes.get("/user/one/:id", auth, async (req, res, next) => {
  userController.getUser(req, res, next);
});

routes.put("/user/provider/:provider", auth, async (req, res, next) => {
  userController.changeUserSelectedProvider(req, res, next);
});

routes.put("/user/addFavorite", auth, async (req, res, next) => {
  userController.addFavorite(req, res, next);
});

routes.put("/user/removeFavorite", auth, async (req, res, next) => {
  userController.removeFavorite(req, res, next);
});

routes.put("/user/deviceId/:deviceId", auth, async (req, res, next) => {
  userController.changeDeviceId(req, res, next);
});

routes.put(
  "/user/notificationToken/:notificationToken",
  auth,
  async (req, res, next) => {
    userController.changeNotificationToken(req, res, next);
  }
);

module.exports = routes;
