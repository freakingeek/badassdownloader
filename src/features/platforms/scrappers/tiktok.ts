import { type Page } from "puppeteer";

export default async function tiktokScrapper(page: Page, payload: string) {
  await page.goto("https://snaptik.app/");

  await page.type("#url", payload);

  await page.click(".button-go");

  await page.waitForSelector(".download-file");

  const url = await page.$$eval(".download-file", (el) => {
    return el[0].getAttribute("href");
  });

  await page.close();

  const response = await fetch(url!);
  const arrayBuffer = await response.arrayBuffer();

  return { buffer: Buffer.from(arrayBuffer), metadata: {} };
}
