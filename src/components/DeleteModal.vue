<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete this book?</p>
      <button @click="$emit('delete-book')" class="delete-button">Delete</button>
      <button @click="$emit('close')" class="cancel-button">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteModal',
  props: {
    visible: { type: Boolean, required: true }
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

.delete-button,
.cancel-button {
  margin-right: 10px;
}
</style>
