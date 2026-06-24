/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    // プレースホルダ実績の picsum.photos（§6: 不足は picsum + TODO）。実画像へ差し替えたら不要。
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
  // 旧 /work/[slug] は新 /projects/[slug] へ恒久リダイレクト（既存URLを壊さない）
  async redirects() {
    return [{ source: '/work/:slug', destination: '/projects/:slug', permanent: true }];
  },
};

module.exports = nextConfig;
