import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import BookLibraryView from "@/views/BookLibraryView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'SignInView',
    component: SignInView
  },
  {
    path: '/library',
    name: 'BookLibraryView',
    component: BookLibraryView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
