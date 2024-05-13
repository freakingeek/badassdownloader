import puppeteer from "puppeteer";
import { DOWNLOAD_PATH } from "../../configs/runtime.js";

export default async function instagramDownloader(postUrl: string) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const page = await browser.newPage();
  const client = await page.createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: DOWNLOAD_PATH,
  });

  await page.goto("https://fastdl.app/en");

  await page.type("#url", postUrl);

  await page.click("#submit");

  await page.waitForSelector("#download-btn");

  const url = await page.$$eval("#download-btn", (el) => {
    return el[0].getAttribute("href");
  });

  await browser.close();

  const response = await fetch(url!);
  const arrayBuffer = await response.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    metadata: {},
  };
}
