<template>
  <main class="main">
    <div class="container">
      <div class="header">
        <div class="header__title">Добавление товара</div>
        <div class="header__sort">
          <select class="header__select select" v-model="selected">
            <option v-for="option in sort" :key="option.id">
              {{option.text}}
            </option>
          </select>
        </div>
      </div>
      <div class="shop-page">
        <div class="form">
          <form class="form__form" novalidate>
            <validation-provider class="form__form validate"  rules="required" v-slot="{ errors }">
              <label for="name" class="form__name">Наименование товара<span>*</span></label>
              <input class="form__input input" type="text"
                     :placeholder="item.name.placeholder"
                     required
                     v-model.trim="item.name.value"
                     id="name">
              <div class="form__name-required">{{ errors[0] }}</div>
            </validation-provider>
              <label for="description" class="form__name">Описание товара</label>
              <textarea class="form__descr textarea"
                        :placeholder="item.description.placeholder"
                        v-model.trim="item.description.value"
                        id="description"/>
            <validation-provider name="source" class="form__form validate" :rules="{required: true}" v-slot="{ errors }">
              <label for="source" class="form__name">Ссылка на изображение товара<span>*</span></label>
              <input class="form__input input"  type="text"
                     :placeholder="item.source.placeholder"
                     required
                     v-model.trim="item.source.value"
                     id="source"
              >
              <div class="form__name-required">{{ errors[0] }}</div>
            </validation-provider>
            <validation-provider class="form__form validate"  rules="required" v-slot="{ errors }">
              <label for="price" class="form__name">Цена товара<span>*</span></label>
              <input class="form__input input"  type="number"
                     :placeholder="item.price.placeholder"
                     required
                     v-model.number="item.price.value"
                     id="price"
              >
              <div class="form__name-required">{{ errors[0] }}</div>
            </validation-provider>
              <button class="form__button-active button" type="submit"
                      v-if="this.validation() === true"
                      @click="onSubmit"
              >Добавить товар</button>
              <button class="form__button button" type="submit"
                      v-else
                      disabled
              >Добавить товар</button>
          </form>
        </div>
        <div class="shop-page__items">
            <div class="shop-page__item" v-for="(item, index) in sortedItems" :key="item.id">
              <item-card :image="item.source.value"
                         :name="item.name.value"
                         :description="item.description.value"
                         :price="item.price.value"
              />
              <button class="basket" @click="remove(index)"/>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="js">
import Vue from 'vue'
import ItemCard from "@/components/item-card";
import {extend, ValidationProvider} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);

extend('required', {
  ...required,
  message: 'Поле является обязательным',
});


export default {
  name: 'IndexPage',
  comments: {
    ItemCard,
    ValidationProvider
  },
  mounted() {
    this.getItem();
  },
  watch: {
    items: {
      handler(updatedList) {
        localStorage.setItem("items", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },

  data() {
    const sort = [
      {text: 'По возрастанию', id: 1},
      {text: 'По убыванию', id: 2},
      {text: 'По имени', id: 3}
    ]
    const item = {
      name: {
        value: null,
        placeholder: 'Введите название товара',
      },
      description: {
        value: null,
        placeholder: 'Введите описание товара',
      },
      source: {
        value: null,
        placeholder: 'Введите ccылку',
      },
      price: {
        value: null,
        placeholder: 'Введите цену',
      }
    }
    return {
      item,
      items:[],
      sort,
      selected: 'По возрастанию',
    }
  },

  methods: {
    getItem() {
      const localItems = localStorage.getItem("items");
      if (localItems) {
        this.items = JSON.parse(localItems);
      }
    },
    validation() {
      if(this.item.name.value && this.item.source.value && this.validSource(this.item.source.value) && this.item.price.value) {
        return true
      }
    },
    validSource(source) {
      const regexp = /(http|https):\/\/([\w.]+\/?)\S*/
      return regexp.test(source)
    },
    onSubmit() {
      if(this.validation() === true) {
        this.items.push(this.item);
      }
      // reset
      this.item = {
        name: {
          value: null,
          placeholder: 'Введите название товара',
        },
        description: {
          value: null,
          placeholder: 'Введите описание товара',
        },
        source: {
          value: null,
          placeholder: 'Введите ccылку',
        },
        price: {
          value: null,
          placeholder: 'Введите цену',
        },
      };
    },
    remove(index) {
      this.items.splice(index, 1);
    },
  },

  computed: {
    sortedItems() {
      switch (this.selected) {
        case 'По возрастанию': return this.items.slice().sort( (prev, curr) => {
          return Number(prev.price.value) < Number(curr.price.value) ? -1 : 1;
        });
        case 'По убыванию': return this.items.slice().sort((prev, curr) => {
          return Number(curr.price.value) > Number(prev.price.value) ? 1 : -1;
        });
        case 'По имени':
          return this.items.slice().sort((prev, curr) => {
          return prev.name.value < curr.name.value ? -1 : 1
        });
        default: return this.items;
      }
    },
  },
}
</script>

<style lang="scss">

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
  &__title {
    margin-top: 32px;
    font-size: 28px;
    font-weight: 600;
    @media (max-width: 767px) {
      text-align: center;
    }
  }
  &__select {
    width: 121px;
    height: 36px;
    border: none;
    outline-width: 0;
  }
}

.shop-page {
  display: flex;
  flex: 0 1 50%;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
  .form {
    min-height: 440px;
    height: 100%;
    padding: 41px 24px 24px 24px;
    background-color: rgba(255, 254, 251, 1);
    box-shadow: rgba(0,0,0,0.1)0 10px 12px 0;
    margin-top: 8px;
    margin-right: 8px;
    flex-basis: 28%;
    &__form {
      display: flex;
      flex-direction: column;
    }
    &__input {
      height: 16px;
      padding: 10px 16px;
    }
    &__name {
      font-size: 10px;
      margin-bottom: 4px;
      color: rgba(73, 72, 94, 1);
      &-required {
        color: rgba(255, 132, 132, 1);
        font-size: 10px;
      }
    }
    &__descr {
      height: 108px;
      margin-bottom: 33px;
      padding: 10px 16px;
    }
    &__button {
      background-color: rgba(238, 238, 238, 1);
      &-active {
        background-color: rgba(123, 174, 115, 1);
        color:rgba(255, 255, 255, 1);
      }
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 767px) {
     justify-content: center;
    }
  }
  &__item {
    position: relative;
    margin: 8px;
    cursor: url("~assets/image/hover.svg"), pointer;
    &:hover {
      .basket {
        display: block;
        z-index: 3;
      }
    }
  }
}
.basket {
  display: none;
  background-color: rgba(255, 132, 132, 1);
  background-image: url("~assets/image/basket.svg");
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 32px;
  height: 32px;
  right: -1%;
  top: -1%;
  cursor: url("~assets/image/hover.svg"), pointer;
  caret-color: rgba(255, 255, 255, 1);
  z-index: 3;
  border: none;
}

.validate {
  margin-bottom: 24px;
}


</style>
