/** @type {import('next').NextConfig} */  
module.exports = {
    images: {
        domains: [
            '127.0.0.1',
            'localhost',
            'res.cloudinary.com',
        ]
    },
    reactStrictMode: false,
    experimental: {
        serverActions: true,
    },
};
