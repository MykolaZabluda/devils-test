<template>
  <div class="book-library">
    <h1>Book Library</h1>
    <div v-if="role">
      <p>Welcome, {{ role }}!</p>

      <button v-if="role === 'user' || role === 'admin'" @click="showAddBookModal = true" class="add-book-button">
        Add a New Book
      </button>

      <button v-if="role === 'admin'" @click="showAddUserModal = true" class="add-user-button">
        Manage Users
      </button>
    </div>

    <div v-if="role" class="book-list">
      <h2>Book List</h2>
      <input type="text" v-model="searchQuery" placeholder="Search books..." />
      <ul>
        <li v-for="(book, index) in filteredBooks" :key="index">
          <strong>{{ book.title }}</strong> by {{ book.author }} ({{ book.year }})
          <p>{{ book.description }}</p>
          <div v-if="canEditOrDelete(book)" class="admin-controls">
            <button v-if="role === 'mentor' || role === 'admin'" @click="handleEditBook(index)">Edit</button>
            <button v-if="role === 'mentor' || role === 'admin'" @click="handleDeleteBook(index)">Delete</button>
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

    <AddUserModal
        :visible="showAddUserModal"
        :user="editingUser"
        @close="closeUserModal"
        @add-user="handleAddUser"
        @update-user="handleUpdateUser"
        @delete-user="handleDeleteUser"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddBookModal from './AddBookModal.vue';
import AddUserModal from './AddUserModal.vue';
import EditModal from './EditModal.vue';

interface Book {
  title: string;
  author: string;
  description: string;
  year: number | null;
  addedBy: string;
}

interface User {
  username: string;
  password: string;
  role: string;
}

export default defineComponent({
  name: 'BookLibrary',
  components: {
    AddBookModal,
    AddUserModal,
    EditModal,
  },
  data() {
    return {
      role: localStorage.getItem('role') || '',
      books: JSON.parse(localStorage.getItem('books') || '[]') as Book[],
      users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
      searchQuery: '',
      showAddBookModal: false,
      showAddUserModal: false,
      editingBook: null as Book | null,
      editingIndex: null as number | null,
      editingUser: null as User | null,
    };
  },
  computed: {
    filteredBooks(): Book[] {
      if (!this.searchQuery) return this.books;
      return this.books.filter(book =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    handleAddBook(newBook: Book) {
      this.books.push({ ...newBook, addedBy: this.role });
      this.saveBooks();
    },
    handleEditBook(index: number) {
      this.editingBook = { ...this.books[index] };
      this.editingIndex = index;
    },
    handleUpdateBook(updatedBook: Book) {
      if (this.editingIndex !== null) {
        this.books.splice(this.editingIndex, 1, updatedBook);
        this.cancelEdit();
        this.saveBooks();
      }
    },
    handleDeleteBook(index: number) {
      this.books.splice(index, 1);
      this.saveBooks();
    },
    cancelEdit() {
      this.editingBook = null;
      this.editingIndex = null;
    },
    canEditOrDelete(book: Book) {
      return (
          this.role === 'admin' ||
          (this.role === 'mentor' && book.addedBy === 'user') ||
          (this.role === 'user' && book.addedBy === this.role)
      );
    },
    handleAddUser(newUser: User) {
      this.users.push(newUser);
      this.saveUsers();
    },
    handleUpdateUser(updatedUser: User) {
      const index = this.users.findIndex(user => user.username === updatedUser.username);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
        this.saveUsers();
      }
    },
    handleDeleteUser(username: string) {
      const index = this.users.findIndex(user => user.username === username);
      if (index !== -1) {
        this.users.splice(index, 1);
        this.saveUsers();
      }
    },
    editUser(user: User) {
      this.editingUser = { ...user };
      this.showAddUserModal = true;
    },
    closeUserModal() {
      this.showAddUserModal = false;
      this.editingUser = null;
    },
    saveBooks() {
      localStorage.setItem('books', JSON.stringify(this.books));
    },
    saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },
  },
  mounted() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }
});
</script>

<style scoped>
.book-library {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button.add-book-button {
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
}

button.add-user-button {
  background-color: #28a745;
  color: #fff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.book-list {
  margin-top: 2rem;
}

.book-list input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.admin-controls {
  margin-top: 10px;
}

.admin-controls button {
  margin-right: 10px;
}
</style>
