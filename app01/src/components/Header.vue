<template>
  <div id="nav">
    <RouterLink to="/" exact>Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/nnn">Not found</RouterLink>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#nav {
    width: 100vw;
  height: 50px;
  background-color: red;
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center
}
#nav a{
    text-decoration: none;
    color: black
}
#nav a:hover{
    cursor:pointer;
    text-decoration: underline;
}
</style>
