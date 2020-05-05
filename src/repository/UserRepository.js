const BaseRepository = require("./BaseRepository");
const UserSchema = require("../models/User");

class UserRepository extends BaseRepository {
  constructor() {
    super(UserSchema);
  }

  async create(user) {
    const result = await super.$save(user);
    return result;
  }

  async getById(id) {
    const result = await UserSchema.findOne({ _id: id });
    return result;
  }

  async getByEmail(email) {
    const result = await UserSchema.findOne({ email: email });
    return result;
  }

  async getUserByEmail(email) {
    const result = await super.$list({ email });
    return result[0];
  }

  async update(user) {
    const result = await super.$update(user);
    return result;
  }

  async removeUser({ id, email }) {
    const query = {};
    query._id = id;
    query.email = email;

    await super.$destroy(query);
  }

  async isAuth(id, token) {
    console.log(id);
    console.log(token);
    const result = await UserSchema.findOne();
    console.log(result);
    return result;
  }
}
module.exports = UserRepository;
