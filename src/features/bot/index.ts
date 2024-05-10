import { Input, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import tiktokDownloader from "../platforms/tiktok.js";
import { platformFinder } from "../../utils/platforms.js";
import { Animations, Platforms } from "../../configs/enums.js";
import spotifyDownloader from "../platforms/spotify.js";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => ctx.reply("Just pass the link"));

const memo: Record<string, string> = {};

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

  await ctx.reply("Let me process that ..");

  if (platform === Platforms.TikTok) {
    if (message in memo) {
      await ctx.reply("Done!");
      await ctx.persistentChatAction("upload_video", async () => {
        await ctx.replyWithVideo(Input.fromFileId(memo[message]), {
          caption: "@badassdownloader",
        });
      });

      return;
    }

    const buffer = await tiktokDownloader(message);

    ctx.reply("Wait!\nFew more seconds ..");
    await ctx.persistentChatAction("upload_video", async () => {
      const file = await ctx.replyWithVideo(Input.fromBuffer(buffer), {
        caption: "@badassdownloader",
      });

      memo[message] = file.video.file_id;
    });
  }

  if (platform === Platforms.Spotify) {
    if (message in memo) {
      await ctx.reply("Done!");
      await ctx.persistentChatAction("upload_voice", async () => {
        await ctx.replyWithAudio(Input.fromFileId(memo[message]), {
          caption: "@badassdownloader",
        });
      });

      return;
    }

    console.log(ctx.update.message);
    const { buffer, metadata } = await spotifyDownloader(message);

    ctx.reply("Wait!\nFew more seconds ..");
    await ctx.persistentChatAction("upload_voice", async () => {
      const file = await ctx.replyWithAudio(Input.fromBuffer(buffer), {
        caption: "@badassdownloader",
        title: metadata.name,
        performer: metadata.artist,
        thumbnail: Input.fromBuffer(metadata.cover),
      });

      memo[message] = file.audio.file_id;
    });
  }
});

export default bot;
