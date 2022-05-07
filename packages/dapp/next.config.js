/** @type {import('next').NextConfig} */

// const withTM = require("next-transpile-modules")(["hardhat"], {
const withTM = require("next-transpile-modules")(["@demo-erc20/hardhat"], {
  debug: true,
});

module.exports = withTM({
  // reactStrictMode: true,
  reactStrictMode: false,
});
