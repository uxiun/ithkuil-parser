/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // experiments: {
  //   asyncWebAssembly: true,
  //   buildHttp: true,
  //   layers: true,
  //   lazyCompilation: true,
  //   outputModule: true,
  //   syncWebAssembly: true,
  //   topLevelAwait: true,
  // },
  webpack: (config, {isServer}) => {
    return {
      ...config, experiments: {
        asyncWebAssembly: true,
        layers: true,
      }
    }
    // config.experiments = {
    //   asyncWebAssembly: true,
    //   buildHttp: true,
    //   lazyCompilation: true,
    //   outputModule: true,
    //   syncWebAssembly: true,
    //   topLevelAwait: true,
    // }
    // config.output.webassemblyModuleFilename =  (isServer ? "../" : "") + "static/wasm/[modulehash].wasm";
    // return config;
  }
}
// console.log(nextConfig)
module.exports = nextConfig
