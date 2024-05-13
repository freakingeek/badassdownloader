import { Platforms } from "../configs/enums.js";

export function platformFinder(url: string) {
  if (url.includes("tiktok.com")) {
    return Platforms.TikTok;
  }

  if (url.includes("spotify.com")) {
    return Platforms.Spotify;
  }

  return Platforms.Unknown;
}
