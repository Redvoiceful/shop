<template>
  <div class="card">
    <div class="card__image">
      <img :src="image" alt="" class="card__image-pic">
    </div>
    <div class="card__content">
      <div class="card__name">{{name}}</div>
      <div class="card__descr">{{description}}</div>
      <div class="card__price">{{price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item-card",
  props: {
    image: String,
    name: String,
    description: String,
    price: String, Number
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 332px;
  margin: 0 8px;
  max-height: 423px;
  height: 100%;
  background-color: rgba(255, 254, 251, 1);
  border-radius: 4px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
  @media (max-width: 1199px) {
    margin: 8px;
  }
  &__image {
    width: 332px;
    height: 200px;
    &-pic {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__content {
    margin: 16px;
  }
  &__name {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 16px;
  }
  &__descr {
    font-size: 16px;
    margin-bottom: 32px;
    word-break: break-all;
  }
  &__price {
    font-weight: 600;
    font-size: 24px;
  }
}
</style>
