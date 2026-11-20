import createNextIntlPlugin from "next-intl/plugin";

/* next-intl reads its per-request config (the locale's messages, the time
   zone) from src/i18n/request.ts. Its middleware is not used: this is a
   static export, see src/i18n/routing.ts. */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
