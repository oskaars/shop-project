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

        // Walidacja email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          this.error = "Niepoprawny format email.";
          return;
        }

        if (this.password.length < 3) {
          this.error = "Hasło musi mieć co najmniej 3 znaki.";
          return;
        }

        this.loading = true;

        this.$store.dispatch("LOGIN_USER", { email: this.email, password: this.password })
          .then((response) => {
            if (response.status === 'logged') {
              const { email } = this.$store.getters.GET_CURRENT_USER;

              if (email) {
                this.logged = true;
                this.email = "";
                this.password = "";
                setTimeout(() => {
                  this.$router.push("/");
                }, 1000);
              } else {
                this.error = "Błąd podczas pobierania danych użytkownika.";
              }
            } else {
              this.error = "Niepoprawne dane logowania.";
            }
          })
          .catch((err) => {
            console.error(err);
            this.error = "Błąd połączenia z serwerem.";
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

  .login-box {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }

  button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  .messages {
    margin-top: 1rem;
  }

  .error {
    color: #dc3545;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 0.75rem;
    border-radius: 4px;
  }

  .success {
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    padding: 0.75rem;
    border-radius: 4px;
  }
  </style>