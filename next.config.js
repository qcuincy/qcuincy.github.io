// next.config.mjs
/** @type {import('next').NextConfig} */

// !! REPLACE 'portfolio' WITH YOUR REPOSITORY NAME !!
const repoName = 'qcuincy.github.io';

const nextConfig = {
  // 1. Tell Next.js to export a static site
  output: 'export',
  
  // 2. Set the base path to your repository name
  basePath: `/${repoName}`,
  
  // 3. Set the asset prefix to the same repository name
  assetPrefix: `/${repoName}/`,
  
  // 4. Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;