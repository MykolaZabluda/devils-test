<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-content-header">
        <h2>Manage Users</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <ul class="user-list">
        <li class="user-list-item" v-for="(user, index) in users" :key="index">
          <span class="decoration decoration-text">{{ user.username }} ({{ user.role }})</span>
          <button class="decoration decoration-button decoration-button-edit" @click="editUser(user)">Edit</button>
          <button class="decoration decoration-button decoration-button-delete" @click="confirmDelete(user.username)">Delete</button>
        </li>
      </ul>
      <button class="add-user" @click="showAddUserModal = true">Add New User</button>

      <AddUserModal
          :visible="showAddUserModal"
          :user="editingUser"
          @close="closeAddUserModal"
          @add-user="handleAddUser"
          @update-user="handleUpdateUser"
          @delete-user="handleDeleteUser"
      />

      <DeleteModal
          :visible="showDeleteModal"
          :delete-name="'user'"
          @delete-book="handleDeleteConfirmed"
          @close="showDeleteModal = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddUserModal from './AddUserModal.vue';
import DeleteModal from './DeleteModal.vue';
import {LS_USERS} from "@/shared/common-constants";
import {UserPermissions} from "@/shared/common-types";

export default defineComponent({
  name: 'AllUsersModal',
  components: { AddUserModal, DeleteModal },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      users: JSON.parse(localStorage.getItem(LS_USERS) || JSON.stringify([])) as UserPermissions[],
      showAddUserModal: false,
      editingUser: null as UserPermissions | null,
      showDeleteModal: false,
      userToDelete: null as string | null,
    };
  },
  methods: {
    editUser(user: UserPermissions): void {
      this.editingUser = { ...user };
      this.showAddUserModal = true;
    },
    closeAddUserModal(): void {
      this.showAddUserModal = false;
      this.editingUser = null;
    },
    handleAddUser(newUser: UserPermissions): void {
      this.users.push(newUser);
      this.saveUsers();
    },
    handleUpdateUser(updatedUser: UserPermissions): void {
      const index = this.users.findIndex((user: UserPermissions) => user.username === updatedUser.username);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
        this.saveUsers();
      }
    },
    confirmDelete(username: string): void {
      this.userToDelete = username;
      this.showDeleteModal = true;
    },
    handleDeleteConfirmed(): void {
      if (this.userToDelete) {
        const index = this.users.findIndex((user) => user.username === this.userToDelete);
        if (index !== -1) {
          this.users.splice(index, 1);
          this.saveUsers();
        }
        this.userToDelete = null;
        this.showDeleteModal = false;
      }
    },
    handleDeleteUser(username: string): void {
      this.confirmDelete(username);
    },
    saveUsers(): void {
      localStorage.setItem(LS_USERS, JSON.stringify(this.users));
    },
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
    position: relative;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;

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

    .user-list {
      list-style-type: none;
      text-align: left;

      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;

        .decoration {
          width: 30%;
        }
      }
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .decoration {
      margin-right: 10px;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &-button {
        padding: 0.75rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 10px;
        color: #fff;
        background: transparent;

        &-edit {
          border: 2px solid #639e73;
          color: #5cb176;
        }

        &-delete {
          border: 2px solid #f2847b;
          color: #ee5e52;
        }
      }
    }
  }

  .add-user {
    padding: 0.75rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 10px;
    border: 2px solid #5d5fef;
    color: #5d5fef;
    background: transparent;
  }
}
</style>
