import puppeteer from "puppeteer";
import { DOWNLOAD_PATH } from "../../configs/runtime.js";

export default async function tiktokDownloader(videoUrl: string) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const page = await browser.newPage();
  const client = await page.createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: DOWNLOAD_PATH,
  });

  page.setViewport({ width: 1366, height: 768 });

  await page.goto("https://snaptik.app/");

  await page.type("#url", videoUrl);

  await page.click(".button-go");

  await page.waitForSelector(".download-file");

  const url = await page.$$eval(".download-file", (el) => {
    return el[0].getAttribute("href");
  });

  await browser.close();

  const response = await fetch(url!);
  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}
