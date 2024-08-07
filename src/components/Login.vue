<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  data() {
    return {
      username: '' as string,
      password: '' as string,
      errorMessage: '' as string,
    };
  },
  methods: {
    handleSubmit() {
      const users = [
        { username: 'admin', password: 'admin', role: 'admin' },
        { username: 'mentor', password: 'mentor', role: 'mentor' },
        { username: 'user', password: 'user', role: 'user' }
      ];

      const user = users.find(
          (u) => u.username === this.username && u.password === this.password
      );

      if (user) {
        localStorage.setItem('role', user.role);
        this.$router.push({ name: 'BookLibraryView' });
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }
});
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
