import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["openweathermap.org", "www.faviconextractor.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.faviconextractor.com",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
};

export default withPWA({
  nextConfig,
});
