<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h2>Add a New Book</h2>
      <form @submit.prevent="handleAddBook">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="book.title" required />
        </div>
        <div class="form-group">
          <label for="author">Author</label>
          <input type="text" id="author" v-model="book.author" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="book.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="year">Year of Publication</label>
          <input type="number" id="year" v-model="book.year" required />
        </div>
        <button type="submit" class="add-button">Add Book</button>
        <button type="button" @click="$emit('close')" class="cancel-button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Book {
  title: string;
  author: string;
  description: string;
  year: number | null;
}

export default defineComponent({
  name: 'AddBookModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      book: {
        title: '',
        author: '',
        description: '',
        year: null
      } as Book
    };
  },
  methods: {
    handleAddBook() {
      this.$emit('add-book', { ...this.book });
      this.book = { title: '', author: '', description: '', year: null };
      this.$emit('close');
    }
  }
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 100%;
}

.form-group {
  margin-bottom: 1rem;
}

input[type="text"], input[type="number"], textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}

button.add-button {
  background-color: #28a745;
  color: #fff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.cancel-button {
  background-color: #dc3545;
  color: #fff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>