<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>Edit Book</h3>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
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
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Book} from "@/shared/common-types";

export default defineComponent({
  name: 'EditModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  },
  methods: {
    handleSubmit(): void {
      this.$emit('update-book', this.book);
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

  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    position: relative;
    box-sizing: border-box;

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
      margin-bottom: 1rem;
      box-sizing: border-box;

      input[type="text"], input[type="number"], textarea {
        width: 100%;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 1rem;
        box-sizing: border-box;
      }
    }
  }

  button.update-button {
    border: 2px solid #5d5fef;
    color: #5d5fef;
    background: transparent;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
  }
}
</style>

