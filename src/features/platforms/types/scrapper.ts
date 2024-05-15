import { type Page } from "puppeteer";

export type Scrapper = (
  page: Page,
  payload: string
) => Promise<{ buffer: Buffer; metadata: {} }>;
