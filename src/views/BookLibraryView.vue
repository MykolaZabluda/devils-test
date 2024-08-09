<template>
  <div class="book-view">
    <BookLibraryStartPage />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import BookLibraryStartPage from "@/components/BookLibraryStartPage.vue";

export default defineComponent({
  components: {
    BookLibraryStartPage
  },
})
</script>

<style scoped lang="scss">
.book-view {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f5f6ff;
}
</style>