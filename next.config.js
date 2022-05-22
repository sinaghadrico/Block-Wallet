/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        infuraKey: process.env.INFURA_KEY,
        alchemyKey: process.env.ALCHEMY_KEY,
        magicKey: process.env.MAGIC_KEY,
        tokenAddress: process.env.TOKEN_ADDRESS,
    },
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
        removeConsole: true,
    },
};

module.exports = nextConfig;
