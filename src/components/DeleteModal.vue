<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>Confirm Delete</h3>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <p>Are you sure you want to delete this {{ deleteName }}?</p>
      <button @click="$emit('delete-book')" class="delete-button">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    deleteName: {
      type: String,
      required: true
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

  h3 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .delete-button {
    border: 2px solid #f2847b;
    color: #ee5e52;
    background: transparent;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
