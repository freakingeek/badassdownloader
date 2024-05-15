export function extractUrl(text: string) {
  return (/https?:\/\/[^\s]+/.exec(text) || [])[0] || "";
}
