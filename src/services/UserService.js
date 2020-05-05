const UserRepository = require("../repository/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.create(data);
      const token = await this.generateAuthToken(user);
      return { user, token };
    } catch (err) {
      throw err;
    }
  }

  async login(email, password) {
    try {
      const user = await this.getUserByEmail(email);

      if (!user) {
        throw new Error("Unable to login");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Unable to login");
      }
      const token = await this.generateAuthToken(user);
      return { user, token };
    } catch (err) {
      throw new Error("Unable to login");
    }
  }

  async generateAuthToken(user) {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);
    this.addToken(user, token);
    return token;
  }

  async tokenIsValid(id, token) {
    try {
      const result = await this.userRepository.isAuth(id, token);
      return result;
    } catch (err) {
      throw new Error("User is not authorized");
    }
  }

  async addToken(user, token) {
    user.tokens.push({ token });
    return await this.userRepository.update(user);
  }

  async getUser(id) {
    if (!id) {
      throw { id: "nenhum identificador encontrado" };
    }
    let user = await this.userRepository.getById(id);
    if (!user) {
      throw "Usuário não encontrado";
    }

    return user;
  }

  async getUserByEmail(email) {
    if (!email) {
      throw { email: "nenhum identificador encontrado" };
    }
    let user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw "Usuário não encontrado";
    }

    return user;
  }

  async changeUserSelectedProvider(id, provider) {
    const user = await this.getUser(id);

    if (!user) {
      throw "Usuário não encontrado";
    }

    user.selectedProvider = provider;

    return await this.userRepository.update(user);
  }

  async addFavorite(id, manga) {
    const user = await this.getUser(id);
    const favorites = user.favorites;
    favorites.push(manga);
    user.favorites = favorites;
    return await this.userRepository.update(user);
  }

  async removeFavorite(id, manga) {
    const user = await this.getUser(id);
    const favorites = user.favorites;

    const index = favorites
      .map((favorite) => favorite.link)
      .indexOf(manga.link);
    if (index >= 0) {
      favorites.splice(index, 1);
      user.favorites = favorites;
      return await this.userRepository.update(user);
    } else {
      throw "Mangá não encontrado";
    }
  }

  async changeDeviceID(id, deviceId) {
    const user = await this.getUser(id);
    user.deviceId = deviceId;
    return await this.userRepository.update(user);
  }

  async changeNotificationToken(id, notificationToken) {
    const user = await this.getUser(id);
    user.notificationToken = notificationToken;
    return await this.userRepository.update(user);
  }

  async logout(user, authToken) {
    try {
      user.tokens = user.tokens.filter((token) => {
        return token.token !== authToken;
      });
      return await this.userRepository.update(user);
    } catch (e) {
      throw new Error("User could not logout");
    }
  }
}
module.exports = UserService;
