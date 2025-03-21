/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/www-portfolio' : '',

};

module.exports = nextConfig; 
