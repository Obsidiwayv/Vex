export function isEnabled(s: string) {
  return s === "YES" ? true : s === "ENABLE" ? true : false;
}
