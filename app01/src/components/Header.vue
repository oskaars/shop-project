<template>
  <div id="nav">
    <RouterLink to="/" exact>Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <div v-show="!user">
      <RouterLink to="/register">Rejestracja</RouterLink>
      <RouterLink to="/login">Logowanie</RouterLink>
    </div>

    <div v-show="user">
      <span>Witaj, {{ user && user.email }}!</span>
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
    user() {
      return this.$store.getters['User/GET_CURRENT_USER'];
    },
    userLoading() {
      return this.$store.getters['User/GET_CURRENT_LOADING'];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('User/LOGOUT_USER')
        .then(() => {
          this.$router.push('/login');
        });
    }
  }
};
</script>

<style scoped>
#nav {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1rem;
  align-items: center;
}

.logout-btn {
  margin-left: 0.5rem;
  cursor: pointer;
}

.logout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
