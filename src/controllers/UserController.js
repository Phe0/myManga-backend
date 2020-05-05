const UserService = require("../services/UserService");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req, res, next) {
    try {
      const result = await this.userService.createUser(req.body);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await this.userService.login(email, password);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async getUser(req, res, next) {
    const { id } = req.params;
    try {
      const result = await this.userService.getUser(id);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async changeUserSelectedProvider(req, res, next) {
    const { provider } = req.params;
    const { _id } = req.user;
    try {
      const result = await this.userService.changeUserSelectedProvider(
        _id,
        provider
      );
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async addFavorite(req, res, next) {
    const { _id } = req.user;
    const manga = req.body;
    try {
      const result = await this.userService.addFavorite(_id, manga);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async removeFavorite(req, res, next) {
    const { _id } = req.user;
    const manga = req.body;
    try {
      const result = await this.userService.removeFavorite(_id, manga);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async changeDeviceId(req, res, next) {
    const { deviceId } = req.params;
    const { _id } = req.user;
    try {
      const result = await this.userService.changeDeviceID(_id, deviceId);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async changeNotificationToken(req, res, next) {
    const { notificationToken } = req.params;
    const { _id } = req.user;
    try {
      const result = await this.userService.changeNotificationToken(
        _id,
        notificationToken
      );
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async logout(req, res, next) {
    const user = req.user;
    const token = req.token;
    try {
      await this.userService.logout(user, token);
      res.status(200);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }
}
module.exports = UserController;
