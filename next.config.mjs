const isGhPagesBuild = process.env.DEPLOY_TARGET === 'gh-pages';
const repoName = 'the1ent-web';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGhPagesBuild ? `/${repoName}` : '',
  assetPrefix: isGhPagesBuild ? `/${repoName}/` : '',
};

export default nextConfig;
