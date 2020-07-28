<template>
  <div class="wrapper">
    <div class="card-form">
      <div class="card-list">
        <div class="card-item" :class="{ '-active': isCardFlipped }">
          <div class="card-item__side -front">
            <div
              class="card-item__focus"
              :class="{ '-active': focusElementStyle }"
              :style="focusElementStyle"
              ref="focusElement"
            ></div>
            <div class="card-item__cover">
              <div class="card-item__bg"></div>
            </div>
            <div class="card-item__wrapper">
              <div class="card-logo" :class="cardType" />
              <label for="cardNumber" class="card-item__number" ref="cardNumber">
                <template>
                  <span v-for="(n, $index) in cardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div
                        class="card-item__numberItem"
                        v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''"
                      >
                        *
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        :key="$index"
                        v-else-if="cardNumber.length > $index"
                      >
                        {{ cardNumber[$index] }}
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active': n.trim() === '' }"
                        v-else
                        :key="$index + 1"
                      >
                        {{ n }}
                      </div>
                    </transition>
                  </span>
                </template>
              </label>
              <div class="card-item__content">
                <label for="cardName" class="card-item__info" ref="cardName">
                  <transition name="slide-fade-up">
                    <div class="card-item__name" v-if="cardName.length" key="1">
                      <transition-group name="slide-fade-up">
                        <span
                          class="card-item__nameItem"
                          v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                          :key="$index + 1"
                          >{{ n }}</span
                        >
                      </transition-group>
                    </div>
                    <div class="card-item__name" v-else key="2">Nom Prénom</div>
                  </transition>
                </label>
                <div class="card-item__date" ref="cardDate">
                  <label for="cardMonth" class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="cardMonth" :key="cardMonth">{{ cardMonth }}</span>
                      <span v-else key="2">mm</span>
                    </transition>
                  </label>
                  /
                  <label for="cardYear" class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="cardYear" :key="cardYear">{{ String(cardYear).slice(2, 4) }}</span>
                      <span v-else key="2">yy</span>
                    </transition>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="card-item__side -back">
            <div class="card-item__cover">
              <div class="card-item__bg"></div>
            </div>
            <div class="card-item__band"></div>
            <div class="card-item__cvv">
              <div class="card-item__cvvTitle">CVV</div>
              <div class="card-item__cvvBand">
                <span v-for="(n, $index) in cardCvv" :key="$index">
                  *
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-select" :class="cardType">
        <div class="choice" @click="chooseCard('mastercard')">
          <img src="@/assets/logo-mastercard.png" alt="mastercard" />
        </div>
        <div class="choice" @click="chooseCard('visa')">
          <img src="@/assets/logo-visa.png" alt="visa" />
        </div>
        <div class="choice" @click="chooseCard('paypal')">
          <img src="@/assets/logo-paypal.png" alt="paypal" />
        </div>
      </div>
      <div class="card-form__inner">
        <div class="card-input">
          <label for="cardName" class="card-input__label">Détenteur de carte</label>
          <input
            type="text"
            id="cardName"
            class="card-input__input"
            v-model="cardName"
            v-on:focus="focusInput"
            v-on:blur="blurInput"
            data-ref="cardName"
            autocomplete="off"
          />
        </div>
        <div class="card-input">
          <label for="cardNumber" class="card-input__label">N° de carte</label>
          <input
            type="text"
            id="cardNumber"
            class="card-input__input"
            v-mask="generateCardNumberMask"
            v-model="cardNumber"
            v-on:focus="focusInput"
            v-on:blur="blurInput"
            data-ref="cardNumber"
            autocomplete="off"
          />
        </div>
        <div class="card-form__row">
          <div class="card-form__col">
            <div class="card-form__group">
              <label for="cardMonth" class="card-input__label">Date d'expiration</label>
              <select
                class="card-input__input -select"
                id="cardMonth"
                v-model="cardMonth"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardDate"
              >
                <option value="" disabled selected>mm</option>
                <option :value="n < 10 ? '0' + n : n" v-for="n in 12" :disabled="n < minCardMonth" :key="n">
                  {{ n &lt; 10 ? '0' + n : n }}
                </option>
              </select>
              <select
                class="card-input__input -select"
                id="cardYear"
                v-model="cardYear"
                v-on:focus="focusInput"
                v-on:blur="blurInput"
                data-ref="cardDate"
              >
                <option value="" disabled selected>yyyy</option>
                <option :value="$index + minCardYear" v-for="(n, $index) in 12" :key="n">
                  {{ $index + minCardYear }}
                </option>
              </select>
            </div>
          </div>
          <div class="card-form__col -cvv">
            <div class="card-input">
              <label for="cardCvv" class="card-input__label">CVV</label>
              <input
                type="text"
                class="card-input__input"
                id="cardCvv"
                v-mask="'####'"
                maxlength="4"
                v-model="cardCvv"
                v-on:focus="flipCard(true)"
                v-on:blur="flipCard(false)"
                autocomplete="off"
              />
            </div>
          </div>
        </div>

        <button class="card-form__button">Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script>
// example taken from https://codepen.io/JavaScriptJunkie/pen/YzzNGeR
export default {
  name: 'Payment',
  data() {
    return {
      cardName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      minCardYear: new Date().getFullYear(),
      cardMask: '#### #### #### ####',
      cardNumberTemp: '',
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
      cardType: 'visa',
      cardTypes: ['mastercard', 'visa', 'paypal'],
    };
  },
  mounted() {
    this.cardNumberTemp = this.cardMask;
  },
  computed: {
    generateCardNumberMask() {
      return this.cardMask;
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = '';
      }
    },
  },
  methods: {
    chooseCard(type) {
      this.cardType = type;
    },
    flipCard(status) {
      this.isCardFlipped = status;
    },
    focusInput(e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
      };
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-select {
  display: flex;
  justify-content: space-between;
  padding: 0 56px;
  margin-top: 100px;
  .choice {
    cursor: pointer;
    border: 1px solid $gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    padding: 20px;
    transition: all 0.25s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    img {
      width: 100%;
      filter: saturate(0);
      transition: all 0.25s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    }
    &:nth-of-type(2) {
      background-color: rgba(6, 19, 45, 0.3);
    }
  }
  &.mastercard {
    .choice:nth-of-type(1) {
      background-color: $white;
      box-shadow: 0px 14px 18px $grayopacity;
      img {
        filter: unset;
      }
    }
  }
  &.visa {
    .choice:nth-of-type(2) {
      background-color: $blue;
      box-shadow: 0px 14px 18px $grayopacity;
      img {
        filter: unset;
      }
    }
  }
  &.paypal {
    .choice:nth-of-type(3) {
      background-color: $white;
      box-shadow: 0px 14px 18px $grayopacity;
      img {
        filter: unset;
      }
    }
  }
}
.card-form {
  position: relative;
  width: 549px;
  border-radius: 9px;
  box-shadow: 0px 11px 40px $grayopacity;
  margin: auto;
  width: 100%;
  background-color: $lighgray;
  .card-logo {
    width: 65px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    &.mastercard {
      background-image: url('../assets/logo-mastercard.png');
    }
    &.visa {
      background-image: url('../assets/logo-visa.png');
    }
    &.paypal {
      background-image: url('../assets/logo-paypal.png');
    }
  }
  &__inner {
    border-radius: 10px;
    padding: 56px 56px 46px 56px;
  }
  &__row {
    display: flex;
    align-items: flex-start;
  }
  &__col {
    flex: auto;
    margin-right: 35px;
    &:last-child {
      margin-right: 0;
    }
    &.-cvv {
      max-width: 150px;
    }
  }
  &__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .card-input__input {
      flex: 1;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__button {
    width: 233px;
    height: 67px;
    display: inline-block;
    background: $red;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-top: 50px;
    cursor: pointer;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 1px;
    @include font-bold;
  }
}
.card-item {
  @include fs-card;
  @include font-light;
  width: 344px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  &.-active {
    .card-item__side {
      &.-front {
        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
      }
      &.-back {
        transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
      }
    }
  }
  &__focus {
    position: absolute;
    z-index: 3;
    border-radius: 5px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.65);
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: rgb(8, 20, 47);
      height: 100%;
      border-radius: 5px;
      filter: blur(25px);
      opacity: 0.5;
    }
    &.-active {
      opacity: 1;
    }
  }
  &__side {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 11px 40px $grayopacity;
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    backface-visibility: hidden;
    height: 100%;
    &.-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
      z-index: 2;
      padding: 0;
      height: 100%;
      .card-item__cover {
        transform: rotateY(-180deg);
      }
    }
  }
  &__bg {
    background-color: $white;
  }
  &__cover {
    height: 100%;
    background: rgb(7, 33, 58);
    background: linear-gradient(28deg, rgba(7, 33, 58, 1) 0%, rgba(7, 73, 135, 1) 100%);
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(6, 2, 29, 0.45);
    }
  }
  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 0 10px;
  }
  &__chip {
    width: 60px;
  }
  &__type {
    height: 45px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    max-width: 100px;
    margin-left: auto;
    width: 100%;
  }
  &__typeImg {
    max-width: 100%;
    object-fit: contain;
    max-height: 100%;
    object-position: top right;
  }
  &__info {
    color: #fff;
    width: 100%;
    max-width: calc(100% - 85px);
    padding: 10px 15px;
    display: block;
    cursor: pointer;
    text-align: left;
  }
  &__holder {
    opacity: 0.7;
    margin-bottom: 6px;
  }
  &__wrapper {
    padding: 20px;
    position: relative;
    z-index: 4;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    img {
      width: 65px;
      display: block;
    }
  }
  &__name {
    line-height: 1;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__nameItem {
    display: inline-block;
    min-width: 8px;
    position: relative;
  }
  &__number {
    color: #fff;
    margin-top: 40px;
    margin-bottom: 35px;
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    font-size: 12px;
  }
  &__numberItem {
    width: 13px;
    display: inline-block;
    &.-active {
      width: 10px;
    }
  }
  &__content {
    color: #fff;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__date {
    flex-wrap: wrap;
    margin-left: auto;
    padding: 10px;
    display: inline-flex;
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
  }
  &__dateItem {
    position: relative;
    span {
      width: 30px;
      display: inline-block;
    }
  }
  &__dateTitle {
    opacity: 0.7;
    padding-bottom: 6px;
    width: 100%;
  }
  &__band {
    background: rgba(0, 0, 19, 0.8);
    width: 100%;
    height: 50px;
    margin-top: 30px;
    position: relative;
    z-index: 2;
  }
  &__cvv {
    text-align: right;
    position: relative;
    z-index: 2;
    padding: 15px;
    .card-item__type {
      opacity: 0.7;
    }
  }
  &__cvvTitle {
    padding-right: 10px;
    color: #fff;
    margin-bottom: 5px;
  }
  &__cvvBand {
    height: 45px;
    background: #fff;
    margin-bottom: 30px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    color: #1a3b5d;
    border-radius: 4px;
    box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.15);
  }
}
.card-list {
  position: relative;
  top: -95px;
  margin-bottom: -130px;
}
.card-input {
  margin-bottom: 20px;
  &__label {
    text-align: left;
    @include fs-light;
    margin-bottom: 5px;
    color: $blue;
    width: 100%;
    display: block;
    user-select: none;
  }
  &__input {
    width: 100%;
    height: 50px;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid $gray;
    transition: all 0.3s ease-in-out;
    padding: 5px 15px;
    background: none;
    color: $blue;
    @include fs-retirer;
    @include font-bold;
    &:hover,
    &:focus {
      border-color: $red;
    }
    &:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.15);
    }
    &.-select {
      -webkit-appearance: none;
      background-image: url('../assets/icons/ChevronDown.svg');
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }
  }
}
.slide-fade-up-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}
.slide-fade-up-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}
.slide-fade-up-enter {
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
}
.slide-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  pointer-events: none;
}
</style>
