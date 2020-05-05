const MangaFox = require("./MangaFox");

class Scrapper {
  constructor(provider) {
    switch (provider) {
      case "mangaFox":
        this.provider = new MangaFox();
    }
  }

  async getLatest(page) {
    return await this.provider.getLatest(page);
  }

  async getTop(page) {
    return await this.provider.getTop(page);
  }

  async searchManga(search, page) {
    return await this.provider.searchManga(search, page);
  }

  async getOne(url) {
    return await this.provider.getOne(url);
  }

  async getChapter(url) {
    return await this.provider.getChapter(url);
  }
}
module.exports = Scrapper;
