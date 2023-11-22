/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /* images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image-cdn-ak.spotifycdn.com ",
        port: "",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "image-cdn-fa.spotifycdn.com ",
        port: "",
        pathname: "/",
      },
    ],
  }, */
  images: {
    domains: [
      "image-cdn-ak.spotifycdn.com",
      "i.scdn.co",

      "image-cdn-fa.spotifycdn.com",
    ],
  },
  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
