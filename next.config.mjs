/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  logging: {
    level: "debug",
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
