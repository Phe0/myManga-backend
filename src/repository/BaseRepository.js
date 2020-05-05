const mongoose = require("mongoose");

class BaseRepository {
  constructor(modelClass) {
    this.modelClass = modelClass;
  }

  async $save(dataModel, mongoSession = {}) {
    if (dataModel._id) {
      dataModel.lastUpdateDate = Date.now();
    }
    const savedModel = await new this.modelClass(dataModel).save({
      session: mongoSession.session,
    });
    return savedModel;
  }

  async $saveMany(itemsModel, mongoSession = {}) {
    itemsModel.forEach((item) => {
      item.lastUpdateDate = Date.now();
    });
    const savedModels = await this.modelClass.insertMany(itemsModel, {
      session: mongoSession.session,
    });
    return savedModels;
  }

  async $update(dataModel, mongoSession = {}) {
    dataModel.lastUpdateDate = Date.now();
    const savedModel = await dataModel.save({ session: mongoSession.session });
    return savedModel;
  }

  async $listAggregate(aggregationPipeline) {
    return await this.modelClass.aggregate(aggregationPipeline).exec();
  }

  async $getById(id, active = true) {
    let finalIdFormat = id;

    if (typeof id === "string") {
      try {
        finalIdFormat = mongoose.Types.ObjectId(id);
      } catch (err) {
        throw "Tamanho ou formato de id inválido";
      }
    }

    const query = {
      _id: finalIdFormat,
    };

    if (active) {
      query.active = true;
    }

    const recordModel = await this.modelClass.findOne(query);

    return recordModel;
  }

  async $list(query, populate = null) {
    const recordModel = await this.modelClass.find(query).populate(populate);
    return recordModel;
  }

  async $countDocuments(query) {
    const numberDocuments = await this.modelClass.countDocuments(query);
    return numberDocuments;
  }

  async findOne(query, mongoSession = {}) {
    let result;

    if (mongoSession !== undefined || mongoSession.session !== undefined) {
      result = await this.modelClass
        .findOne(query)
        .session(mongoSession.session);
      return result;
    }
    result = await this.modelClass.findOne(query);

    return result;
  }

  async $destroy(query) {
    const result = await this.modelClass.deleteOne(query);
    return result;
  }
}

module.exports = BaseRepository;
