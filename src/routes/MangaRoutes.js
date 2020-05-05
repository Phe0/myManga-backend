const express = require("express");
const MangaController = require("../controllers/MangaController");
const auth = require("../middleware/auth");

const mangaController = new MangaController();
const routes = express.Router();

routes.get(
  "/manga/latest/:providerName/page/:page",
  auth,
  async (req, res, next) => {
    mangaController.getLatest(req, res, next);
  }
);

routes.get(
  "/manga/top/:providerName/page/:page",
  auth,
  async (req, res, next) => {
    mangaController.getTop(req, res, next);
  }
);

routes.get(
  "/manga/search/:providerName/:search/page/:page",
  auth,
  async (req, res, next) => {
    mangaController.searchManga(req, res, next);
  }
);

routes.get(
  "/manga/one/:providerName/url/:url",
  auth,
  async (req, res, next) => {
    mangaController.getOne(req, res, next);
  }
);

routes.get(
  "/manga/chapter/:providerName/url/:url",
  auth,
  async (req, res, next) => {
    mangaController.getChapter(req, res, next);
  }
);

module.exports = routes;
