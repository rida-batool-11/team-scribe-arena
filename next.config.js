// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["eohfbujmezyszxliytha.supabase.co"],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lufncljpjpsabtrjgjke.supabase.co",
        // Optional: specify a path or pattern if needed
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
