<template>
    <div class="register-container">

      <AppLoader v-if="loading" />
      <div >
        <h2>Rejestracja</h2>

        <form @submit.prevent="onSubmit">

          <div>
            <label for="email">Email:</label>
            <input id="email" type="email" v-model="email"  />
          </div>

          <div>
            <label for="password">Hasło:</label>
            <input id="password" type="password" v-model="password"  />
          </div>
          <div>
            <label for="password_r">Powtórz hasło:</label>
            <input id="password_r" type="password" v-model="password1"  />
          </div>


          <button type="submit" :disabled="disabled || loading">
            Zarejestruj się
          </button>

          <div >
            <div v-if="error">{{ error }}</div>
            <div v-if="exists">Użytkownik o podanym adresie email już istnieje.</div>
            <div v-if="registered">Konto zostało pomyślnie założone.</div>
          </div>

        </form>
      </div>
    </div>
  </template>

  <script>
  import { registerUser } from "@/api";
  import AppLoader from "@/components/AppLoader.vue";

  export default {
    name: "RegisterView",
    components: {
      AppLoader,
    },
    data() {
      return {
        email: "",
        password: "",
        password1: "",
        error: "",
        exists: false,
        registered: false,
        loading: false,
      };
    },
    computed: {
      disabled() {
        return this.email.length < 3 || this.password.length < 3 || this.password1 !== this.password;
      },
    },
    methods: {
      onSubmit() {
        this.error = "";
        this.exists = false;
        this.registered = false;

        if (this.password.length < 3) {
          this.error = "Hasło za krótkie, minimum 3 znaki.";
          return;
        }
        if(this.password !== this.password1){
          this.error = " Hasła sie nie zgadzaja "
        }

        this.loading = true;

        registerUser({ email: this.email, password: this.password })
          .then((response) => {
            if (response.status === "exists") {
              this.exists = true;
            } else if (response.status === "registered") {
              this.registered = true;
              this.email = "";
              this.password = "";
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
  .register-container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  </style>
