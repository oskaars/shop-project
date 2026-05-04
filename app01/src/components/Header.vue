<template>
  <div id="nav">
    <RouterLink to="/" exact>Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <div v-if="!currentUser">
      <RouterLink to="/register">Rejestracja</RouterLink>
      <RouterLink to="/login">Logowanie</RouterLink>
    </div>

    <div v-else>
      <span>Witaj, {{ currentUser.email }}!</span>
      <button @click="logout" :disabled="userLoading" class="logout-btn">
        Wyloguj się
      </button>
    </div>

    <RouterLink to="/nnn">Not found</RouterLink>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.getters.GET_CURRENT_USER;
    },
    userLoading() {
      return this.$store.getters.GET_CURRENT_LOADING;
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('User/LOGOUT_USER');
        this.$router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  }
};
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

.logout-btn {
  background: none;
  border: 1px solid black;
  padding: 0.25rem 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.logout-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
