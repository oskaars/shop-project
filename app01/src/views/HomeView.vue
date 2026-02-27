<template>
  <div>
    <RouterLink
      v-for="promotion in promotionsList"
      :to="`/promotion/${promotion.id}`"
      :key="promotion.id"
    >
      <PromotionTile v-bind:promotion="promotion" />
    </RouterLink>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("FETCH_PROMOTIONS");
  },
  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST;
    },
  },
};
</script>

<style lang="scss" scoped></style>
