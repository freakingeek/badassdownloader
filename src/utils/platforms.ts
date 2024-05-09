import { Platforms } from "../configs/enums.js";

export function platformFinder(url: string) {
  if (url.includes("tiktok.com")) {
    return Platforms.TikTok;
  }

  return Platforms.Unknown;
}
