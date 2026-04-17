<template>
<div class="rating">
    <span v-for="n in Math.floor(product.rate)" :key="n">
      ⭐
    </span>
  </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },

}
</script>

<style lang="scss" scoped></style>