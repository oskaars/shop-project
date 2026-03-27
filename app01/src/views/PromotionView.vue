<template>
  <div>
    <ProductTile
      v-for="product in promotionObject.items"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id);
  },
  computed: {
    promotionObject() {
      return this.$store.getters.GET_PROMOTION_OBJECT;
    }
  },
  methods: {
    promotionLoading(){
        return this.$store.getters.GET_PROMOTION_OBJECT;
    }
  },
};
</script>

<style lang="scss" scoped></style>
