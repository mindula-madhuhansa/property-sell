/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ljdlmojmlpdwckcvafdc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
