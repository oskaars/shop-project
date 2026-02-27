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
            
        }
        
    }
</script>

<style lang="scss" scoped>

</style>