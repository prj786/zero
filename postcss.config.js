require('dotenv').config();

const environment = {
  plugins: [
    require('autoprefixer')
  ]
};

if (process.env.MODE === 'production') {
  environment.plugins.push(
    require('cssnano')({
      preset: ['default',
        { discardComments: { removeAll: true } }]
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./dist/**/*.html']
    })
  );
}

module.exports = environment;
