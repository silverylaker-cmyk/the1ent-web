const isGhPagesBuild = process.env.DEPLOY_TARGET === 'gh-pages';
const repoName = 'the1ent-web';
const basePath = isGhPagesBuild ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: isGhPagesBuild ? `/${repoName}/` : '',
  // raw <video>/<img>/CSS url()은 basePath가 자동 적용되지 않으므로 lib/base.ts의 withBase()로 붙인다
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
