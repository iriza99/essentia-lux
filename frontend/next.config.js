const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Repo root has its own package-lock.json alongside this frontend/ one;
  // scope file tracing to this project so Vercel doesn't pull in backend/.
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // eslint-config-next pins ESLint 8, which is incompatible with the
    // linter API Next 15's build step expects ("Unknown options: useEslintrc,
    // extensions"). Type-checking (tsc --noEmit) already runs clean; skip
    // lint at build time until eslint-config-next ships an ESLint 9 config.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xltfapwqbmfpebbszrxk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
