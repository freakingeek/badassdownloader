import { type PuppeteerLaunchOptions } from "puppeteer";

export const BROWSER_LAUNCH_OPTIONS: PuppeteerLaunchOptions = {
  args: ["--no-sandbox"],
  defaultViewport: { width: 1366, height: 768 },
};
