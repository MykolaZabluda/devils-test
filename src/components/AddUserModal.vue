<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-content-header">
        <h2>{{ user ? 'Edit User' : 'Add User' }}</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input type="text" id="username" class="form-control" placeholder="" v-model="form.username" required>
          <label for="username" class="form-label">Username</label>
        </div>

        <div class="form-group">
          <input type="password" id="password" class="form-control" placeholder="" v-model="form.password" required>
          <label for="password" class="form-label">Password</label>
        </div>

        <div class="form-group">
          <select id="role" v-model="form.role" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
        <button type="submit" class="save-button">{{ user ? 'Update User' : 'Add User' }}</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {LS_USERS, UserRole} from "@/shared/common-constants";
import {UserPermissions} from "@/shared/common-types";

export default defineComponent({
  name: 'AddUserModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object as PropType<UserPermissions>,
      default: null,
    },
  },
  data() {
    return {
      form: {
        username: this.user?.username || '',
        password: this.user?.password || '',
        role: this.user?.role || UserRole.user,
      },
    };
  },
  watch: {
    user(newUser): void {
      if (newUser) {
        const { username, password, role } = newUser;
        this.form.username = username;
        this.form.password = password;
        this.form.role = role;
      } else {
        this.form.username = '';
        this.form.password = '';
        this.form.role = UserRole.user;
      }
    },
  },
  methods: {
    handleSubmit(): void {
      let users = JSON.parse(localStorage.getItem(LS_USERS) || JSON.stringify([]));

      if (this.user) {
        users = users.map((permission: UserPermissions) => {
          return permission.username === this.user.username ? {...this.form} : permission;
        });
        this.$emit('update-user', { ...this.form });
      } else {
        users.push({ ...this.form });
        this.$emit('add-user', { ...this.form });
      }

      localStorage.setItem(LS_USERS, JSON.stringify(users));
      this.$emit('close');
    }
  },
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    position: relative;

    &-header {
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;

      .close-button {
        position: absolute;
        top: 15px;
        right: 15px;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: #000;
        font-weight: bold;
        background: transparent;
      }
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

      select {
        width: 100%;
        padding: 12px 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
      }
    }

    .save-button {
      margin-right: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      border: 2px solid #5d5fef;
      color: #5d5fef;
      background: transparent;
      box-sizing: border-box;
    }
  }
}
</style>
