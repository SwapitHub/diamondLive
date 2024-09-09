/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/engagement-rings/start-with-a-diamond/lab_grown',
        destination: '/engagement-rings/start-with-a-diamond/', 
      },
      {
        source: '/diamonds/search-lab-diamonds/lab_grown',
        destination: '/engagement-rings/start-with-a-diamond/', 
      },
      {
        source: '/diamonds/color-diamonds/start-with-a-diamond',
        destination: '/engagement-rings/start-with-a-diamond/', 
      },
     
      {
        source: '/engagement-rings/start-with-bridal-set',
        destination: '/engagement-rings/start-with-a-setting?bridal-sets=true', 
      },
      {
        source: '/engagement-rings/shape/:shape',
        destination: '/engagement-rings/start-with-a-setting/', 
      },
      {
        source: '/engagement-rings/style/:style',
        destination: '/engagement-rings/start-with-a-setting/', 
      },
      {
        source: '/engagement-rings/:trellis',
        destination: '/engagement-rings/start-with-a-setting/', 
      },
      {
        source: '/api/:path*', 
        destination: 'https://api.rocksama.com/admin/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
