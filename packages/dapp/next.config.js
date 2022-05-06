/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@demo-dapp-erc20/hardhat"]);

const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
};

module.exports = withTM(nextConfig);
