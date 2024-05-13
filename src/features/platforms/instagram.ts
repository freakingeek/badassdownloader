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

  page.setViewport({ width: 1366, height: 768 });

  await page.goto("https://snapinsta.app/");

  await page.type("#url", postUrl);

  await page.click("#btn-submit");

  await page.waitForSelector(".download-bottom a");

  const url = await page.$$eval(".download-bottom a", (el) => {
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
