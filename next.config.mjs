/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },

      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9199",
        pathname: "/v0/b/matcher-da279.appspot.com/**",
      },

      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/matcher-da279.appspot.com/**",
      },
    ],
  },
};

export default nextConfig;
