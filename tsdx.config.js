// const sass  = require('rollup-plugin-sass');
 
// module.exports = {
//     rollup(config, options) {
//         config.plugins.push(
//             sass()
//         );
//         return config;
//     },
// };

const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        use: ['sass'],
        plugins: [],
      })
    );
    return config;
  },
};