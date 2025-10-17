/** @type {import('next').NextConfig} */
const nextConfig = {
  // 添加 assetPrefix
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://lct.zhjwork.online' : '',

  // 启用 standalone 输出模式以支持 Docker
  output: 'standalone',

  // 优化图片处理
  images: {
    unoptimized: true
  },

  // 服务器外部包配置
  serverExternalPackages: []
};

export default nextConfig;
