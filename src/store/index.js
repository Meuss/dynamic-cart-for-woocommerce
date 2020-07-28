import Vue from 'vue';
import Vuex from 'vuex';
import products from '../assets/products.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allProducts: products,
    StoreCart: products,
    DetailedProduct: products[0],
  },
  getters: {
    allProducts: state => state.allProducts,
    StoreCart: state => state.StoreCart,
    DetailedProduct: state => state.DetailedProduct,
  },
  mutations: {
    ADD_Item(state, id) {
      const elem = state.StoreCart.filter(product => product.id === id)[0];
      elem.amount++;
    },
    REMOVE_Item(state, id) {
      const elem = state.StoreCart.filter(product => product.id === id)[0];
      elem.amount--;
    },
    REMOVE_Item_from_cart(state, id) {
      const elem = state.StoreCart.find(product => product.id === id);
      if (elem) {
        state.StoreCart.splice(elem, 1);
      }
    },
    SET_Product_detail(state, id) {
      const elem = state.allProducts.find(product => product.id === id);
      state.DetailedProduct = elem;
    },
    REMOVE_Product_detail(state) {
      state.DetailedProduct = null;
    },
  },
  actions: {
    addItem(context, id) {
      context.commit('ADD_Item', id);
    },
    removeItem(context, id) {
      if (context.state.StoreCart.find(product => product.id === id).amount > 1) {
        context.commit('REMOVE_Item', id);
      } else {
        context.commit('REMOVE_Item_from_cart', id);
      }
    },
    removefromCart(context, id) {
      context.commit('REMOVE_Item_from_cart', id);
    },
    setProductDetail(context, id) {
      context.commit('SET_Product_detail', id);
    },
    removeProductDetail(context) {
      context.commit('REMOVE_Product_detail');
    },
  },
  modules: {},
});
