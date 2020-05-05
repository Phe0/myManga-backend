const Scrapper = require("../scrapper/Scrapper");

class MangaController {
  async getLatest(req, res, next) {
    const { providerName, page } = req.params;
    const provider = new Scrapper(providerName);
    try {
      const result = await provider.getLatest(page);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async getTop(req, res, next) {
    const { providerName, page } = req.params;
    const provider = new Scrapper(providerName);
    try {
      const result = await provider.getTop(page);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async searchManga(req, res, next) {
    const { providerName, search, page } = req.params;
    const provider = new Scrapper(providerName);
    try {
      const result = await provider.searchManga(search, page);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async getOne(req, res, next) {
    const { providerName, url } = req.params;
    const provider = new Scrapper(providerName);
    try {
      const result = await provider.getOne(url);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }

  async getChapter(req, res, next) {
    const { providerName, url } = req.params;
    const provider = new Scrapper(providerName);
    try {
      const result = await provider.getChapter(url);
      res.status(200).json(result);
      next();
    } catch (err) {
      res.status(400).json({ error: err });
      next();
    }
  }
}
module.exports = MangaController;
