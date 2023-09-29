/** @type {import('next').NextConfig} */  
module.exports = {
    images: {
        domains: ['127.0.0.1', 'localhost']
    },
    reactStrictMode: false,
    experimental: {
        serverActions: true,
    },
};
