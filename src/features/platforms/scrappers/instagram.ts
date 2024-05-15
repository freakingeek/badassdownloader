import { type Page } from "puppeteer";

export default async function instagramDownloader(page: Page, payload: string) {
  await page.goto("https://fastdl.app/en");

  await page.type("#url", payload);

  await page.click("#submit");

  await page.waitForSelector("#download-btn");

  const url = await page.$$eval("#download-btn", (el) => {
    return el[0].getAttribute("href");
  });

  await page.close();

  const response = await fetch(url!);
  const arrayBuffer = await response.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    metadata: {},
  };
}
