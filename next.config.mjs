/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  images: {
    domains: ["openweathermap.org"],
  },
};

export default withPWA();
