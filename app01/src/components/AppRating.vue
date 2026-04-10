<template>
<div class="rating">
    <span v-for="n in Math.floor(rate)" :key="n">
      ⭐
    </span>
  </div>
</template>

<script>
export default {
    props: {
        rate: {
            type: Number,
            required: true
        }
    },

}
</script>

<style lang="scss" scoped></style>