export function isSafari() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android");
}