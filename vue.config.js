module.exports = {
  filenameHashing: false,
  // publicPath: '/wp-content/plugins/dynamic-cart-for-woocommerce/dist/',
  publicPath: process.env.NODE_ENV === 'production' ? '/wp-content/plugins/dynamic-cart-for-woocommerce/dist/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/_variables.scss";
        `,
      },
    },
  },
};
