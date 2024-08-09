<template>
  <div class="login-form">
    <h2 class="title">Login</h2>
    <form @submit.prevent="handleSubmit">

      <div class="form-group">
        <input type="text" id="username" class="form-control" placeholder="" v-model="username" required>
        <label for="username" class="form-label">Your username</label>
      </div>

      <div class="form-group">
        <input type="password" id="password" class="form-control" placeholder="" v-model="password" required>
        <label for="password" class="form-label">Your password</label>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit" class="login-button">Next</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {UserPermissions} from "@/shared/common-types";
import {DEFAULT_PERMISSIONS, LS_ROLE, LS_USERS} from "@/shared/common-constants";

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
    setUserPermission(users: UserPermissions[]): UserPermissions {
      return users.find((permissions: UserPermissions) => {
        return permissions.username === this.username && permissions.password === this.password
      }) as UserPermissions;
    },
    setUserRole(user: UserPermissions): void {
      localStorage.setItem(LS_ROLE, user.role);
      this.$router.push({ name: 'BookLibraryView' });
    },
    handleSubmit(): void {
      const users = JSON.parse(localStorage.getItem(LS_USERS) || JSON.stringify([]));

      let user = this.setUserPermission(users);

      if (!user) {
        user = this.setUserPermission(DEFAULT_PERMISSIONS);
      }

      user
          ? this.setUserRole(user)
          : this.errorMessage = 'Invalid username or password';
    }
  }
});
</script>

<style scoped lang="scss">
.login-form {
  max-width: 70%;
  width: 25%;
  padding: 40px 60px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .title {
    font-family: sans-serif;
    font-weight: 600;
    font-size: 36px;
    padding-bottom: 5%;
  }

  .form-group {
    position: relative;
    margin-bottom: 20px;

    .form-control {
      width: 100%;
      padding: 12px 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;

      &:focus {
        border-color: #333;
      }

      &:focus + .form-label,
      &:not(:placeholder-shown) + .form-label {
        transform: translateY(-18px);
        font-size: 12px;
        color: #333;
        background-color: white;
        padding: 0 4px;
        border-radius: 4px;
      }
    }

    .form-label {
      position: absolute;
      left: 12px;
      top: 12px;
      font-size: 16px;
      color: #aaa;
      pointer-events: none;
      transition: all 0.2s ease-out;
    }
  }

  .error-message {
    text-align: left;
    color: red;
    margin: -10px 0 15px 0;
    font-size: 14px;
  }

  .login-button {
    width: 100%;
    padding: 12px 10px;
    background: linear-gradient(90deg, rgba(184,108,248,1) 0%, rgba(107,181,248,1) 100%);
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-family: sans-serif;
  }
}
</style>
