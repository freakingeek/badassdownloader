import { type Page } from "puppeteer";

export default async function pinterestDownloader(page: Page, payload: string) {
  await page.goto("https://savepin.app/");

  await page.type("#url", payload);

  await page.click("#submiturl");

  await page.waitForSelector("#submiturl");

  const url = await page.$$eval("#submiturl", (el) => {
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
