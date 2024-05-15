import { Input, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { extractUrl } from "../../utils/strings.js";
import { Animations } from "../../configs/enums.js";
import { findScrapperByUrl } from "../platforms/index.js";
import { providePageToScrapper } from "../browser/index.js";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => ctx.reply("Just pass the link"));

bot.on(message("text"), async (ctx) => {
  const message = ctx.update.message.text;
  const url = extractUrl(message);
  const scrapper = findScrapperByUrl(url);

  if (!scrapper) {
    await ctx.reply("Unknown URL it is");
    setTimeout(async () => {
      await ctx.sendAnimation(Input.fromFileId(Animations.Gasp));
    }, 500);

    return;
  }

  await providePageToScrapper(scrapper, url);
});

export default bot;
