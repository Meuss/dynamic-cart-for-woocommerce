<template>
  <div class="details">
    <div class="left" :class="`product-` + id">
      <router-link class="back-button" to="/">
        <img src="@/assets/icons/arrow-back-white.svg" alt="Go back" />
      </router-link>
      <div class="left-inner">
        <img class="shoe" src="@/assets/shoe-big.png" alt="shoe" />
        <div class="design">
          <span class="line"></span>
          <div>
            <span>Design by</span>
            <span>{{ design }}</span>
          </div>
        </div>
      </div>
      <div class="number">{{ number }}</div>
    </div>
    <div class="description">
      <h4>Sku n° {{ sku }}</h4>
      <h1>{{ name }}</h1>
      <h3>Intro</h3>
      <p>{{ description }}</p>
      <h3>Caractéristiques</h3>
      <div>
        <p>Matière</p>
        <p>Synthétique</p>
      </div>
      <div>
        <p>Couleurs</p>
        <div class="colors">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <button class="remove-button" @click="removefromCart(id)">
        <img src="@/assets/icons/icon-x.svg" alt="remove" />
        <span></span>
        Retirer du panier
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Details',
  computed: mapState({
    id: state => state.DetailedProduct.id,
    name: state => state.DetailedProduct.name,
    sku: state => state.DetailedProduct.sku,
    price: state => state.DetailedProduct.price,
    number: state => state.DetailedProduct.number,
    description: state => state.DetailedProduct.description,
    design: state => state.DetailedProduct.design,
  }),
  methods: {
    removefromCart(id) {
      this.$store.dispatch('removefromCart', id);
      setTimeout(() => {
        this.$router.push('/');
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  min-height: 100vh;
  display: flex;
  .left {
    background-image: url('../assets/icons/background.svg');
    background-position: 70% 80%;
    width: calc(100% - 765px);
    position: relative;
    &.product-2 {
      filter: hue-rotate(100deg);
    }
    &.product-3 {
      filter: hue-rotate(-40deg);
    }
  }
  .back-button {
    display: inline-block;
    position: absolute;
    left: 100px;
    top: 100px;
    z-index: 1;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.02);
    }
  }
}
.number {
  @include fs-number;
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: -20px;
  color: $white;
  pointer-events: none;
}
.description {
  width: 565px;
  overflow: hidden;
  flex-shrink: 0;
  margin: 100px 100px 0 100px;
  text-align: left;
  > div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $gray;
  }
  p {
    @include font-regular;
    @include fs-text;
  }
  h3:nth-of-type(2) {
    margin-bottom: 0;
  }
  .colors {
    display: flex;
    align-items: center;
    div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: $black;
      margin-left: 20px;
      &:nth-of-type(2) {
        background-color: $red;
      }
      &:nth-of-type(3) {
        background-color: #7519ff;
      }
    }
  }
  .remove-button {
    background-color: $red;
    border-radius: 50px;
    color: $white;
    font-size: 20px;
    padding: 0;
    @include font-bold;
    display: flex;
    align-items: center;
    padding: 5px 20px 5px 10px;
    margin-top: 60px;
    margin-left: auto;
    img {
      pointer-events: none;
      width: 45px;
      height: 45px;
    }
    span {
      display: block;
      height: 30px;
      width: 1px;
      margin: 0 20px 0 13px;
      background-color: $white;
    }
  }
}
.left-inner {
  position: relative;
  height: 100%;
  .shoe {
    width: 1192px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 1;
  }
  .design {
    overflow: hidden;
    position: absolute;
    bottom: 140px;
    left: 40%;
    display: flex;
    z-index: 1;
    .line {
      margin-top: 5px;
      width: 200px;
      height: 1px;
      background-color: $white;
      display: inline-block;
    }
    div {
      margin-left: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        @include fs-text;
        @include font-bold;
      }
      span:first-of-type {
        @include fs-light;
        @include font-regular;
      }
    }
  }
  span {
    color: $white;
  }
}
h4 {
  @include font-regular;
  @include fs-light;
  color: $gray;
  margin: 0;
}
h3 {
  @include font-bold;
  @include fs-light;
  margin-top: 37px;
  margin-bottom: 22px;
}
h1 {
  @include font-bold;
  @include fs-h1;
  letter-spacing: 0.7px;
  margin: 0;
}
</style>
