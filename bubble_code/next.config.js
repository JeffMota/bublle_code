const removeImports = require("next-remove-imports")();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = removeImports({
  experimental: { esmExternals: true }
});

module.exports = nextConfig
