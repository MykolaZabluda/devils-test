<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>Add a New Book</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <form @submit.prevent="handleAddBook">

        <div class="form-group">
          <input type="text" id="title" class="form-control" placeholder="" v-model="book.title" required>
          <label for="title" class="form-label">Title</label>
        </div>

        <div class="form-group">
          <input type="text" id="author" class="form-control" placeholder="" v-model="book.author" required>
          <label for="author" class="form-label">Author</label>
        </div>

        <div class="form-group">
          <textarea id="description" class="form-control" placeholder="" v-model="book.description" required></textarea>
          <label for="description" class="form-label">Description</label>
        </div>

        <div class="form-group">
          <input type="number" id="year" class="form-control" placeholder="" v-model="book.year" required>
          <label for="year" class="form-label">Year of Publication</label>
        </div>

        <button type="submit" class="add-button">Add Book</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {Book} from "@/shared/common-types";
import {setDefaultBookData} from "@/shared/common-helpers";

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
    handleAddBook(): void {
      this.$emit('add-book', { ...this.book });
      this.book = setDefaultBookData();
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
      position: relative;
      margin-bottom: 20px;
      box-sizing: border-box;

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
  }

  button.add-button {
    border: 2px solid #639e73;
    color: #5cb176;
    background: transparent;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
  }
}
</style>