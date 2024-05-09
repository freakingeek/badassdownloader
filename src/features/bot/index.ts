import { Input, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { platformFinder } from "../../utils/platforms.js";
import { Animations, Platforms } from "../../configs/enums.js";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => ctx.reply("Just pass the link"));

bot.on(message("text"), async (ctx) => {
  const message = ctx.update.message.text;
  const platform = platformFinder(message);

  if (platform === Platforms.Unknown) {
    await ctx.reply("Unknown URL it is");
    setTimeout(async () => {
      await ctx.sendAnimation(Input.fromFileId(Animations.Gasp));
    }, 500);

    return;
  }

  await ctx.reply("Yep were working fine!");
});

export default bot;
