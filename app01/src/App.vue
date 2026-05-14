<template>
    <div>
        <Header />
        
        <RouterView />
    </div>
</template>

<script>
import Header from './components/Header.vue';

    export default {
        components:{
            Header,
        },
        beforeCreate() {
            this.$store.dispatch('User/FETCH_CURRENT_USER');
        }
    }
</script>

<style lang="scss" scoped>

</style>