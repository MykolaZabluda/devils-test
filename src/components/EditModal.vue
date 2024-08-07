<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <h3>Edit Book</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="edit-title">Title</label>
          <input type="text" id="edit-title" v-model="book.title" required />
        </div>
        <div class="form-group">
          <label for="edit-author">Author</label>
          <input type="text" id="edit-author" v-model="book.author" required />
        </div>
        <div class="form-group">
          <label for="edit-description">Description</label>
          <textarea id="edit-description" v-model="book.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="edit-year">Year of Publication</label>
          <input type="number" id="edit-year" v-model="book.year" required />
        </div>
        <button type="submit" class="update-button">Update Book</button>
        <button @click="$emit('close')" class="cancel-button">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Book } from './BookLibrary.vue';

export default defineComponent({
  name: 'EditModal',
  props: {
    visible: { type: Boolean, required: true },
    book: { type: Object as () => Book, required: true }
  },
  methods: {
    handleSubmit() {
      this.$emit('update-book', this.book);
    }
  }
});
</script>

<style scoped>
.modal {
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

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.form-group {
  margin-bottom: 10px;
}

.update-button,
.cancel-button {
  margin-right: 10px;
}
</style>
