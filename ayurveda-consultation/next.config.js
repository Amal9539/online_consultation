/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    },
    // Keep these packages out of the Next.js bundle so their
    // relative file assets (e.g. PDFKit font .afm files) are
    // resolved from node_modules at runtime instead of from
    // the broken .next/server/vendor-chunks path.
    serverComponentsExternalPackages: ["pdfkit", "fontkit"]
  }
};

module.exports = nextConfig;
