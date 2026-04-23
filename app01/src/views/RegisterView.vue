<template>
    <div class="register-container">
      
      <AppLoader v-if="loading" />
  
      <div class="register-box">
        <h2>Rejestracja</h2>
  
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
            Zarejestruj się
          </button>
  
          <div class="messages">
            <div v-if="error" >{{ error }}</div>
            <div v-if="exists" >Użytkownik o podanym adresie email już istnieje.</div>
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
        error: "",
        exists: false,
        registered: false,
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
        this.exists = false;
        this.registered = false;
        
        if (this.password.length < 3) {
          this.error = "Hasło musi mieć co najmniej 3 znaki.";
          return;
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
  .register-container {
    display: flex;
    justify-content: center;
    margin-top: 50px; 
  }
  
  .register-box {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left; 
  }
  
  input, button {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
  }
  
  button {
    margin-top: 10px;
    cursor: pointer;
  }
  
  button:disabled {
    opacity: 0.5;
  }
  
  .messages {
    margin-top: 20px;
    font-weight: bold;
  }
  
  </style>