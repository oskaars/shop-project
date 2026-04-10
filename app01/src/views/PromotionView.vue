<template>
<AppLoader v-show="this.showLoader"/>
  <div v-show="!this.showLoader">
    <ProductTile
      v-for="product in promotionObject.items"
      :key="product.id"
      :product="product"
    />
    <AppRating
        v-for="rate in promotionObject.rate"
        :rate=rate     
    />

  </div>
  
</template>

<script>
import AppRating from '@/components/AppRating.vue';
import ProductTile from '@/components/ProductTile.vue';
import AppLoader from '@/components/AppLoader.vue';
export default {
  components: {
    ProductTile,
    AppRating,
    AppLoader
  },
  data(){
    return{
      showLoader: true
    }
  },
  created() {
    this.$store.dispatch("FETCH_PROMOTION", this.$route.params.id);
    setTimeout(() => {
      this.showLoader = false;
    }, 2000);
  },
  computed: {
    promotionObject() {
      return this.$store.getters.GET_PROMOTION_OBJECT;
    }
  },
  methods: {
    promotionLoading(){
        return this.$store.getters.GET_PROMOTION_LOADING;
    },
    promotionError(){
        return this.$store.getters.GET_PROMOTION_ERROR;
    }
  },
};
</script>

<style lang="scss" scoped></style>
