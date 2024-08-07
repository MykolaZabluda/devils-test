<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ user ? 'Edit User' : 'Add User' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="form.username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="form.role" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
        <button type="submit" class="save-button">{{ user ? 'Update User' : 'Add User' }}</button>
        <button type="button" @click="$emit('close')" class="cancel-button">Cancel</button>
        <button v-if="user" type="button" @click="handleDelete" class="delete-button">Delete User</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AddUserModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object as PropType<{ username: string; password: string; role: string }>,
      default: null,
    },
  },
  data() {
    return {
      form: {
        username: this.user ? this.user.username : '',
        password: this.user ? this.user.password : '',
        role: this.user ? this.user.role : 'user',
      },
    };
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.form.username = newUser.username;
        this.form.password = newUser.password;
        this.form.role = newUser.role;
      } else {
        this.form.username = '';
        this.form.password = '';
        this.form.role = 'user';
      }
    },
  },
  methods: {
    handleSubmit() {
      if (this.user) {
        this.$emit('update-user', { ...this.form });
      } else {
        this.$emit('add-user', { ...this.form });
      }
      this.$emit('close');
    },
    handleDelete() {
      this.$emit('delete-user', this.form.username);
      this.$emit('close');
    },
  },
});
</script>

<style scoped>
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
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 1rem;
}

.save-button, .cancel-button, .delete-button {
  margin-right: 1rem;
}

.save-button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
