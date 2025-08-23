const cheerio = require("cheerio");
const axios = require("axios");

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    "Accept-Language": "th-TH,th;q=0.9,en;q=0.8",
  },
};

export interface DataTransfer {
  keyword: string;
  url: string;
  limit: number;
}
const searchKeyword = (data: DataTransfer) => {
  const { keyword, url, limit } = data;

  const encodedString = encodeURI(keyword);
  try {
    return axios
      .get(
        `https://www.google.com/search?q=${encodedString}&hl=th&gl=th&start=${limit}`,
        AXIOS_OPTIONS
      )
      .then(function ({ data }) {
        const parseData = parseGoogle(data);
        console.log("parseData", data);
        let $ = cheerio.load(data);

        const links = [];
        const titles = [];
        const snippets = [];

        $(".yuRUbf > a").each((i, el) => {
          console.log("links222", $(el).attr("href"));
          links[i] = $(el).attr("href");
        });
        $(".yuRUbf > a > h3").each((i, el) => {
          titles[i] = $(el).text();
        });
        $(".IsZvec").each((i, el) => {
          snippets[i] = $(el).text().trim();
        });

        let result: any = {};
        for (let i = 0; i < links.length; i++) {
          if (links[i].search(url) >= 0 && !result?.position) {
            result = { position: i + limit + 1 };
          }
        }
        return result;
      });
  } catch (error) {
    console.error(error);
  }
};

function parseGoogle(data) {
  const $ = cheerio.load(data);
  const results = [];

  $(".tF2Cxc").each((i, el) => {
    const link = $(el).find(".yuRUbf > a").attr("href");
    const title = $(el).find("h3").text();
    const snippet = $(el).find(".VwiC3b").text();

    if (link) {
      results.push({ title, link, snippet });
    }
  });

  return results;
}

export default searchKeyword;
