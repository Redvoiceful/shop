<template>
  <main class="shop">
    <section class="shop-page">
      <h1 class="shop-page__header">Добавление товара</h1>
      <div class="shop-page__wrapper">
        <div class="shop-page__fields">
          <form class="shop-page__fields-form">
            <div class="shop-page__fields-name">Наименование товара<span>*</span></div>
            <input class="shop-page__fields-input" type="text"
                   :placeholder="item.name.placeholder"
                   required
                   v-model="item.name.value">
            <div class="shop-page__fields-name">Описание товара <span>*</span></div>
            <textarea class="shop-page__fields-descr"
                      :placeholder="item.description.placeholder"
                      v-model="item.description.value"/>
            <div class="shop-page__fields-name">Ссылка на изображение товара</div>
            <input class="shop-page__fields-input"  type="text"
                   :placeholder="item.source.placeholder"
                   required
                   v-model="item.source.value">
            <div class="shop-page__fields-name">Цена товара<span>*</span></div>
            <input class="shop-page__fields-input"  type="text"
                   :placeholder="item.price.placeholder"
                   required
                   v-model="item.price.value">
            <button class="shop-page__fields-button" type="submit" @click="onSubmit">Добавить товар</button>
          </form>
        </div>
        <div class="shop-page__items">
          <item-card v-for="(item, id) in items"
                     :key="id"
                     :image="item.source.value"
                     :name="item.name.value"
                     :description="item.description.value"
                     :price="item.price.value"
                      class="shop-page__item"/>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="js">
import ItemCard from "@/components/item-card";
export default {
  name: 'IndexPage',
  comments: {
    ItemCard
  },
  mounted() {
    this.getItem();
  },
  watch: {
    items: {
      handler(updatedList) {
        localStorage.setItem("items", JSON.stringify(updatedList));
        console.log(updatedList)
      },
      deep: true,
    },
  },

  data() {
    const item = {
      name: {
        value: '',
        placeholder: 'Введите название товара',
        id: 1
      },
      description: {
        value: '',
        placeholder: 'Введите описание товара',
        id: 2
      },
      source: {
        value: '',
        placeholder: 'Введите ccылку',
        id: 3
      },
      price: {
        value: '',
        placeholder: 'Введите цену',
        id: 4
      },
    }
    return {
      item,
      items:[]
    }
  },

  methods: {
    getItem() {
      const localItems = localStorage.getItem("items");
      if (localItems) {
        this.items = JSON.parse(localItems);
      }
    },
    onSubmit() {
      this.items.push(this.item);

      // reset
      this.item = {
        name: {
          value: '',
          placeholder: 'Введите название товара',
          id: 1
        },
        description: {
          value: '',
          placeholder: 'Введите описание товара',
          id: 2
        },
        source: {
          value: '',
          placeholder: 'Введите ccылку',
          id: 3
        },
        price: {
          value: '',
          placeholder: 'Введите цену',
          id: 4
        },
      };
    },
    remove(index) {
      this.items.splice(index, 1);
    },
  }

}
</script>

<style lang="scss">

.shop-page {
  margin: 0 auto;
  background-color: rgba(255, 254, 251, 0.8);
  max-width: 1470px;
  padding: 0 15px;
  &__header {
    @media (max-width: 767px) {
      text-align: center;
    }
  }
  &__wrapper {
    display: flex;
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: center;
    }
  }
  &__fields {
    max-width: 332px;
    min-height: 440px;
    height: 100%;
    padding: 41px 24px 24px 24px;
    background-color: rgba(255, 254, 251, 1);
    box-shadow: rgba(0,0,0,0.1)0 10px 12px 0;
    margin-right: 16px;
    &-form {
      display: flex;
      flex-direction: column;
    }
    &-name {
      font-size: 10px;
      margin-bottom: 4px;
      color: rgba(73, 72, 94, 1)
    }
    &-input {
      width: 274px;
      height: 16px;
      margin-bottom: 33px;
      box-shadow: rgba(0,0,0,0.1)0 10px 12px 0;
      border-radius: 4px;
      border: 1px solid rgba(0,0,0,0.1);
      padding: 10px 16px;
      font-size: 12px;
      color: rgba(63, 63, 63, 1);
    }
    &-descr {
      border-radius: 4px;
      width: 274px;
      height: 108px;
      box-shadow: rgba(0,0,0,0.1)0 10px 12px 0;
      margin-bottom: 33px;
      border: 1px solid rgba(0,0,0,0.1);
      padding: 10px 16px;
      font-size: 12px;
      color: rgba(63, 63, 63, 1);
    }
    &-button {
      background-color: rgba(238, 238, 238, 1);
      border-radius: 10px;
      border: none;
      padding: 10px 95px;
      color: rgba(180, 180, 180, 1);
    }
  }
  &__items {
    display: flex;
    @media (max-width: 1199px) {
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  &__item {
    flex-basis: 50%;
  }
}

</style>
