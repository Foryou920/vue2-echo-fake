const path = require("path");
function resolve(dir){
  return path.join(__dirname, dir);
}
const projectName = require("./package.json").name;

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      stylus: {
        import: [path.resolve(__dirname, "./src/assets/css") + "/index.styl"]
      }
    }
  },
  devServer: {
    port: 8080
  },
  configureWebpack: {
    name: projectName,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  }
};
