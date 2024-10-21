/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  
    experimental: {
      instrumentationHook: true,
    },
  
  async rewrites() {
    return [
      {
        source: '/diamond/shape',
        destination: '/diamond',
      },
      {
        source: '/gemstone/style',
        destination: '/gemstone',
      },
      {
        source: '/gemstone/shape',
        destination: '/gemstone',
      },
      {
        source: '/gemstone/color',
        destination: '/gemstone',
      },
      {
        source: '/engagement-rings/shape',
        destination: '/engagement-rings',
      },
      {
        source: '/engagement-rings/style',
        destination: '/engagement-rings',
      },
      {
        source: '/wedding-band/women',
        destination: '/wedding-band',
      },
      {
        source: '/wedding-band/men',
        destination: '/wedding-band',
      },
      {
        source: '/wedding-band/womens-by-metal',
        destination: '/wedding-band',
      },
      {
        source: '/wedding-band/mens-by-metal',
        destination: '/wedding-band',
      },
      
    ]
  },
};
module.exports = nextConfig;


