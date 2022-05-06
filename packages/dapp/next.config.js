/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@demo-erc20/hardhat"], {
  debug: true,
});

const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
};

// module.exports = nextConfig;

module.exports = withTM(nextConfig);
