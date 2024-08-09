<template>
  <div class="book-library">
    <h1>Book Library</h1>
    <WelcomePopup v-if="role" :role="role" />

    <div v-if="role">
      <button v-if="role === 'user' || role === 'admin'" @click="showAddBookModal = true" class="add-book-button">
        Add a New Book
      </button>

      <button v-if="role === 'admin'" @click="showUserManagementModal = true" class="add-user-button">
        Manage Users
      </button>
    </div>

    <div v-if="role" class="book-list">
      <h2>Book List</h2>
      <input type="text" v-model="searchQuery" placeholder="Search books..." />
      <ul>
        <li v-for="(book, index) in filteredBooks" :key="index" class="book-item">
          <div class="book-info">
            <strong>{{ book.title }}</strong> by {{ book.author }} ({{ book.year }})
            <p>{{ book.description }}</p>
          </div>
          <div v-if="canEditOrDelete(book)" class="admin-controls">
            <button @click="handleEditBook(index)" class="edit-button">
              Edit
            </button>
            <button @click="confirmDeleteBook(index)" class="delete-button">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>

    <EditModal
        :visible="editingBook !== null"
        :book="editingBook"
        @close="cancelEdit"
        @update-book="handleUpdateBook"
    />

    <AddBookModal
        :visible="showAddBookModal"
        @close="showAddBookModal = false"
        @add-book="handleAddBook"
    />

    <AllUserModal
        :visible="showUserManagementModal"
        :users="users"
        @close="showUserManagementModal = false"
        @delete-user="handleDeleteUser"
    />

    <DeleteModal
        :visible="showDeleteModal"
        :delete-name="'book'"
        @delete-book="handleDeleteConfirmed"
        @close="cancelDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WelcomePopup from './WelcomePopup.vue';
import AddBookModal from './AddBookModal.vue';
import EditModal from './EditModal.vue';
import AllUserModal from "@/components/AllUsersModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import { Book, UserPermissions } from "@/shared/common-types";
import { LS_BOOKS, LS_ROLE, LS_USERS, UserRole } from "@/shared/common-constants";

export default defineComponent({
  name: 'BookLibrary',
  components: {
    WelcomePopup,
    DeleteModal,
    AllUserModal,
    AddBookModal,
    EditModal,
  },
  data() {
    return {
      role: localStorage.getItem(LS_ROLE) || '',
      books: JSON.parse(localStorage.getItem(LS_BOOKS) || JSON.stringify([])) as Book[],
      users: JSON.parse(localStorage.getItem(LS_USERS) || JSON.stringify([])) as UserPermissions[],
      searchQuery: '',
      showAddBookModal: false,
      showUserManagementModal: false,
      showDeleteModal: false,
      editingBook: null as Book | null,
      editingIndex: null as number | null,
      bookToDeleteIndex: null as number | null,
    };
  },
  computed: {
    filteredBooks(): Book[] {
      if (!this.searchQuery) {
        return this.books;
      }

      return this.books.filter((book: Book) =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    handleAddBook(newBook: Book): void {
      this.books.push({ ...newBook, addedBy: this.role });
      this.saveBooks();
    },
    handleEditBook(index: number): void {
      this.editingBook = { ...this.books[index] };
      this.editingIndex = index;
    },
    handleUpdateBook(updatedBook: Book): void {
      if (this.editingIndex !== null) {
        this.books.splice(this.editingIndex, 1, updatedBook);
        this.cancelEdit();
        this.saveBooks();
      }
    },
    confirmDeleteBook(index: number): void {
      this.bookToDeleteIndex = index;
      this.showDeleteModal = true;
    },
    handleDeleteConfirmed(): void {
      if (this.bookToDeleteIndex !== null) {
        this.books.splice(this.bookToDeleteIndex, 1);
        this.saveBooks();
        this.cancelDelete();
      }
    },
    cancelEdit(): void {
      this.editingBook = null;
      this.editingIndex = null;
    },
    cancelDelete(): void {
      this.showDeleteModal = false;
      this.bookToDeleteIndex = null;
    },
    canEditOrDelete(book: Book): boolean {
      const isAdmin = this.role === UserRole.admin;
      const isMentor = this.role === UserRole.mentor;

      return isAdmin || isMentor;
    },
    saveBooks(): void {
      localStorage.setItem(LS_BOOKS, JSON.stringify(this.books));
    },
    saveUsers(): void {
      localStorage.setItem(LS_USERS, JSON.stringify(this.users));
    },
  },
  mounted() {
    const storedBooks = localStorage.getItem(LS_BOOKS);
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }

    const storedUsers = localStorage.getItem(LS_USERS);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }
});
</script>

<style scoped lang="scss">
.book-library {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  button.add-book-button {
    border: 2px solid #5d5fef;
    color: #5d5fef;
    background: transparent;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin: 1rem;
  }

  button.add-user-button {
    border: 2px solid #639e73;
    color: #5cb176;
    background: transparent;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .book-list {
    margin-top: 2rem;

    & input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    ul {
      list-style-type: none;
      padding: 0;

      .book-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;

        .book-info {
          flex-grow: 1;
        }

        .admin-controls {
          display: flex;
          flex-direction: column;

          .edit-button,
          .delete-button {
            padding: 0.75rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 10px;
            background: transparent;
          }

          .edit-button {
            border: 2px solid #639e73;
            color: #5cb176;
          }

          .delete-button {
            border: 2px solid #f2847b;
            color: #ee5e52;
          }
        }
      }
    }
  }
}
</style>
