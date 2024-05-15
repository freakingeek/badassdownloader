import puppeteer from "puppeteer";
import { type Scrapper } from "../platforms/index.js";
import { BROWSER_LAUNCH_OPTIONS } from "./configs/runtime.js";

const browser = await puppeteer.launch(BROWSER_LAUNCH_OPTIONS);
const page = await browser.newPage();

export function providePageToScrapper(scrapper: Scrapper, url: string) {
  return scrapper(page, url);
}
