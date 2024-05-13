import puppeteer from "puppeteer";
import { DOWNLOAD_PATH } from "../../configs/runtime.js";

export default async function spotifyDownloader(songUrl: string) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const page = await browser.newPage();
  const client = await page.createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: DOWNLOAD_PATH,
  });

  page.setViewport({ width: 1366, height: 768 });

  await page.goto("https://spotmate.online/");

  await page.type("#trackUrl", songUrl);

  await page.click("#btnSubmit");

  await page.waitForSelector(".btn-success");

  await page.click(".btn-success");

  await page.waitForSelector(".btn-new a");

  const url = await page.$$eval(".btn-new a", (el) => {
    return el[0].getAttribute("href");
  });

  // Metadata
  const cover = await page.$$eval(".img-thumbnail", (el) => {
    return el[0].getAttribute("src")!;
  });

  const coverRes = await fetch(cover)
  const coverArrayBuffer = await coverRes.arrayBuffer()
  const coverBuffer = Buffer.from(coverArrayBuffer)

  const name = await page.$$eval("#tracks p:first-child", (el) => {
    return el[0].textContent!;
  });

  const artist = await page.$$eval("#tracks p:last-child", (el) => {
    return el[0].textContent!;
  });

  await browser.close();

  const response = await fetch(url!);
  const arrayBuffer = await response.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    metadata: { name, artist, cover: coverBuffer },
  };
}
