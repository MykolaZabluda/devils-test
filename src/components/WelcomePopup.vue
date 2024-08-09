<template>
  <div v-if="visible" class="welcome-popup">
    <div class="popup-content">
      <p>Welcome, {{ role }}!</p>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WelcomePopup',
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closePopup() {
      this.visible = false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.closePopup();
    }, 1500);
  },
});
</script>

<style scoped>
.welcome-popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;

  .popup-content {
    text-align: center;

    p {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }

    button {
      border: 2px solid #f2847b;
      color: #ee5e52;
      background: transparent;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
    }
  }
}
</style>
