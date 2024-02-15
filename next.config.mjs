import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["openweathermap.org"],
  },
};

export default withPWA({
  nextConfig,
});
