<template>
  <div class="signin">
    <Login />
  </div>
</template>

<script lang="ts">
import Login from "@/components/Login.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignInView',
  components: {
    Login,
  }
});
</script>

<style scoped lang="scss">
.signin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #f5f6ff;
}
</style>