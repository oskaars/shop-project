<template>
    <div class="login-container">

      <AppLoader v-if="loading" />
      <div class="login-box">
        <h2>Logowanie</h2>

        <form @submit.prevent="onSubmit">

          <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" type="email" v-model="email"  />
          </div>

          <div class="form-group">
            <label for="password">Hasło:</label>
            <input id="password" type="password" v-model="password"  />
          </div>

          <button type="submit" :disabled="disabled || loading">
            Zaloguj się
          </button>

          <div class="messages">
            <div v-if="error">{{ error }}</div>
            <div v-if="logged" class="success">Zalogowano pomyślnie!</div>
          </div>

        </form>
      </div>
    </div>
  </template>

  <script>
  import AppLoader from "@/components/AppLoader.vue";

  export default {
    name: "LoginView",
    components: {
      AppLoader,
    },
    data() {
      return {
        email: "",
        password: "",
        error: "",
        logged: false,
        loading: false,
      };
    },
    computed: {
      disabled() {
        return this.email.length < 3 || this.password.length < 3;
      },
    },
    methods: {
      onSubmit() {
        this.error = "";
        this.logged = false;

        if (!this.email.includes('@')) {
          this.error = "Podaj poprawny email.";
          return;
        }

        if (this.password.length < 3) {
          this.error = "Hasło musi mieć co najmniej 3 znaki.";
          return;
        }

        this.loading = true;

        this.$store.dispatch("LOGIN_USER", { email: this.email, password: this.password })
          .then(() => {
            const user = this.$store.getters['GET_CURRENT_USER'];
            const email = user && user.email;

            if (email) {
              this.logged = true;
              this.email = "";
              this.password = "";
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            } else {
              this.error = "Zły email lub hasło.";
            }
          })
          .catch((err) => {
            console.error(err);
            this.error = "Błąd serwera, spróbuj ponownie później.";
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  };
  </script>

  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  </style>
