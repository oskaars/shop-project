<template>
  <RouterLink :to="`/product/${product.id}`">
    <img />
    <div>{{ product.name }}</div>
    <div>{{ product.price }}</div>
  </RouterLink>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
