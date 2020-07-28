<template>
  <div class="shopping">
    <div class="outer-cart">
      <div class="top">
        <h1>Panier</h1>
        <a href="/">
          <img src="@/assets/icons/arrow-back.svg" alt="Go back" />
          Continuer le shopping
        </a>
      </div>
      <div v-if="cart.length" class="cart">
        <div v-for="(product, index) in cart" :key="index" class="product-item" :class="`product-` + product.id">
          <router-link to="/details" class="detail-link">
            <div class="image" @click="goToDetail(product.id)">
              <span></span>
              <img src="@/assets/shoe.png" :alt="product.name" />
            </div>
            <div class="title" @click="goToDetail(product.id)">
              <div class="name">{{ product.name }}</div>
              <div class="sku">n° {{ product.sku }}</div>
            </div>
          </router-link>
          <div class="amount">
            <button class="button-minus" @click="removeItem(product.id)"><span></span></button>
            <div>{{ product.amount }}</div>
            <button class="button-plus" @click="addItem(product.id)"><span></span><span></span></button>
          </div>
          <div class="price"><span>CHF</span>{{ (product.price * product.amount).toFixed(2) }}</div>
          <button class="button-plus button-x" @click="removefromCart(product.id)"><span></span><span></span></button>
        </div>
        <div class="total">
          <span>Total</span>
          <div>CHF {{ total.toFixed(2) }}</div>
        </div>
      </div>
      <div v-else class="empty">Votre panier est vide.</div>
    </div>
    <Payment />
  </div>
</template>

<script>
import Payment from '@/components/Payment.vue';

export default {
  name: 'Cart',
  components: {
    Payment,
  },
  computed: {
    cart() {
      return this.$store.getters.StoreCart;
    },
    total() {
      let total = 0;
      this.$store.getters.StoreCart.forEach(product => {
        total += product.price * product.amount;
      });
      return total;
    },
  },
  mounted() {
    this.$store.dispatch('removeProductDetail');
  },
  methods: {
    addItem(id) {
      this.$store.dispatch('addItem', id);
    },
    removeItem(id) {
      this.$store.dispatch('removeItem', id);
    },
    removefromCart(id) {
      this.$store.dispatch('removefromCart', id);
    },
    goToDetail(id) {
      this.$store.dispatch('setProductDetail', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.shopping {
  padding: 120px 29px 67px 117px;
  color: $blue;
  display: flex;
  justify-content: space-between;
  h1 {
    @include fs-big;
  }
  .outer-cart {
    flex: 1;
    margin-right: 150px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      display: flex;
      img {
        margin-right: 15px;
      }
    }
  }
}
.cart {
  display: flex;
  flex-direction: column;
}
.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  border-bottom: 1px solid $gray;
  &.product-2 .image {
    filter: hue-rotate(100deg);
  }
  &.product-3 .image {
    filter: hue-rotate(-40deg);
  }
}
.detail-link {
  display: flex;
  &:hover {
    .image span {
      transform: translate(-50%, -50%) scale(0.97);
    }
  }
  .image {
    position: relative;
    span {
      background-color: $red;
      border-radius: 50%;
      width: 150px;
      height: 150px;
      display: block;
      position: absolute;
      z-index: -1;
      top: 60%;
      left: 45%;
      transform: translate(-50%, -50%) scale(1);
      transition: transform 0.5s cubic-bezier(0.4, 0, 0, 1);
    }
    img {
      width: 260px;
      margin-left: -53px;
      display: inline-block;
      max-width: none;
    }
  }
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    width: 167px;
  }
  .sku {
    @include font-regular;
    @include fs-light;
    color: $gray;
  }
}
.amount {
  display: flex;
  align-items: center;
  & > div {
    @include font-bold;
    @include fs-light;
    border-radius: 50%;
    border: 1px solid $gray;
    margin: 0 17px;
    width: 62px;
    height: 62px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
button {
  position: relative;
  width: 40px;
  height: 40px;
  padding: 10px;
  span {
    display: block;
    background-color: $black;
    height: 1px;
  }
  &.button-plus {
    span:last-of-type {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: calc(100% - 20px);
      width: 1px;
    }
  }
  &.button-x {
    transform: rotate(45deg);
    margin-right: -10px;
  }
}
.price {
  display: flex;
  width: 140px;
  span {
    @include fs-light;
    margin-right: 4px;
  }
}
.total {
  margin-top: 75px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include fs-big;
  span {
    color: $gray;
    @include fs-text;
    @include font-light;
    margin-right: 20px;
  }
}
.empty {
  text-align: left;
  margin-top: 100px;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
