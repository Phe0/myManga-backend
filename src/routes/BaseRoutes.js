const mangaRoutes = require("./MangaRoutes");
const userRoutes = require("./UserRoutes");

module.exports = (app) => {
  app.use("/api", [mangaRoutes, userRoutes]);
};
