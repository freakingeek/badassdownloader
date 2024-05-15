import tiktokScrapper from "../scrappers/tiktok.js";
import spotifyScrapper from "../scrappers/spotify.js";
import instagramScrapper from "../scrappers/instagram.js";
import pinterestScrapper from "../scrappers/pinterest.js";

export default function findCorrectScrapper(url: string) {
  const scrappers = {
    "tiktok.com": tiktokScrapper,
    "spotify.com": spotifyScrapper,
    "pinterest.com": pinterestScrapper,
    "instagram.com": instagramScrapper,
  };

  for (const key of Object.keys(scrappers)) {
    if (url.includes(key)) {
      return scrappers[key as keyof typeof scrappers];
    }
  }
}
