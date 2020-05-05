const axios = require("axios");
const cheerio = require("cheerio");

class MangaFox {
  constructor() {
    this.baseUrl = "https://ww3.mangafox.online";
  }

  async getLatest(page = 1) {
    const url = `${this.baseUrl}/page/${page}`;

    try {
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const mangas = $(".content_grid > ul > li");
      const latestMangas = [];
      mangas.each(function () {
        const name = $(this)
          .find(".content_grid_item .content_grid_item_name a")
          .text();
        const link = $(this)
          .find(".content_grid_item .content_grid_item_name a")
          .attr("href");
        const img = $(this)
          .find(".content_grid_item .content_grid_item_img a .img-responsive")
          .attr("src");
        latestMangas.push({
          name,
          link,
          img,
        });
      });
      return latestMangas;
    } catch (e) {
      throw new Error("Houve um erro ao carregar os mangás mais recentes");
    }
  }

  async getTop(page = 1) {
    const url = `${this.baseUrl}/page/${page}`;

    try {
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const mangas = $(".content_grid > ul > li");
      const latestMangas = [];
      mangas.each(function () {
        const name = $(this)
          .find(".content_grid_item .content_grid_item_name a")
          .text();
        const link = $(this)
          .find(".content_grid_item .content_grid_item_name a")
          .attr("href");
        const img = $(this)
          .find(".content_grid_item .content_grid_item_img a .img-responsive")
          .attr("src");
        latestMangas.push({
          name,
          link,
          img,
        });
      });
      return latestMangas;
    } catch (e) {
      throw new Error("Houve um erro ao carregar os mangás mais recentes");
    }
  }

  async searchManga(search, page = 1) {
    const url = `${this.baseUrl}/search/${search}/page/${page}`;

    try {
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const mangas = $(".content_grid > ul > li");
      const foundMangas = [];
      mangas.each(function () {
        const name = $(this)
          .find(".content_grid_item .content_grid_item_name a")
          .text();
        const link = $(this)
          .find(".content_grid_item .content_grid_item_name a")
          .attr("href");
        const img = $(this)
          .find(".content_grid_item .content_grid_item_img a .img-responsive")
          .attr("src");
        foundMangas.push({
          name,
          link,
          img,
        });
      });
      return foundMangas;
    } catch (e) {
      throw new Error("Houve um erro ao procurar por esse mangá");
    }
  }

  async getOne(url) {
    try {
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);

      const name = $(".manga_name > h1").text();

      const listAuthors = $(".manga_des ul").children().eq(1).find("a");
      const authors = [];
      listAuthors.each(function () {
        authors.push($(this).attr("title"));
      });
      const summary = $(".manga_des_content > p").text();
      const listCategories = $(".manga_des ul").children().eq(2).find("a");
      const categories = [];
      listCategories.each(function () {
        categories.push($(this).attr("title"));
      });
      const listChapters = $(".manga_chapter_list > ul > li");
      const chapters = [];
      listChapters.each(function () {
        const name = $(this).find(".chapter_number a").text();
        const link = $(this).find(".chapter_number a").attr("href");
        chapters.push({
          name,
          link,
        });
      });
      return {
        name,
        authors,
        summary,
        categories,
        chapters,
      };
    } catch (e) {
      throw new Error("Houve um erro ao procurar por esse mangá");
    }
  }

  async getChapter(url) {
    try {
      const response = await axios(url);
      const html = response.data;
      const $ = cheerio.load(html);

      const name = $(".manga_view_name h1").text();
      const prevLink = $(".next_prev").children("a").eq(0).attr("href");
      const nextLink = $(".next_prev").children("a").eq(1).attr("href");
      const imagesList = $(".list_img > img");
      const pages = [];
      imagesList.each(function () {
        pages.push($(this).attr("src"));
      });
      return {
        name,
        prevLink,
        nextLink,
        pages,
      };
    } catch (e) {
      throw new Error("Houve um erro ao procurar por esse capítulo");
    }
  }
}

module.exports = MangaFox;
