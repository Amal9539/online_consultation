/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdfkit"],
    serverActions: {
      bodySizeLimit: "10mb"
    }
  }
};

module.exports = nextConfig;