module.exports = function (ctx) {
    return { 
        parser: 'postcss-scss',
        plugins: {
            'postcss-import': { root: ctx.file.dirname }
        }
    }
  }