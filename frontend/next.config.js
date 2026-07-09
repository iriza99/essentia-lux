/** @type {import('next').NextConfig} */
const nextConfig = {
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
  webpack: (config) => {
    // @supabase/ssr pulls in @supabase/realtime-js, which depends on `ws`
    // (Node-only WebSocket client). We don't use Realtime, but the middleware
    // bundle still includes it and `ws` references `__dirname`, which throws
    // in the Edge Runtime. Stub it out so it never gets bundled.
    config.resolve.alias = {
      ...config.resolve.alias,
      ws: false,
    };
    return config;
  },
};

module.exports = nextConfig;
