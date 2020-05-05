const mongoose = require("mongoose");

const databaseURL = process.env.DATABASE_URL || "mongodb://mongo:27017/myManga";

const databaseConnect = async () => {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Banco de dados conectado!");
  } catch (error) {
    console.log("Não foi possível inicializar corretamente a base de dados!");
    console.log(error);
  }
};

module.exports = databaseConnect;
