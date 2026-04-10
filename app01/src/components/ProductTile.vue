<template>
  <RouterLink :to="`/product/${product.id}`">
    <img />
    <div>{{ product.name }}</div>
    <div>{{ product.price }}zł</div>
  </RouterLink>
</template>

<script>
export default {
  name: "ProductTile",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped></style>
