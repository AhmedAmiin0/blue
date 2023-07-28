import { createRouter, createWebHistory } from "vue-router";

// import Home from "@/views/Tasks/ListAllTasks.vue";
import Tags from "@/views/Tags/ListAllTags.vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
export const routes = [
  {
    path: "/",
    name: "Tasks",
    component: () => import("@/views/Tasks/ListAllTasks.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/create",
    name: "CreateTask",
    component: () => import("@/views/Tasks/CreateTask.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/edit/:TaskId",
    name: "EditTask",
    component: () => import("@/views/Tasks/EditTask.vue"),
    meta: { requireAuth: true },
  },

  {
    path: "/Tags",
    name: "Tags",
    component: Tags,
    meta: { requireAuth: true },
  },
  {
    path: "/Tags/create",
    name: "CreateTag",
    component: () => import("@/views/Tags/CreateTag.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/Tags/edit/:TagId",
    name: "EditTag",
    component: () => import("@/views/Tags/EditTag.vue"),
    meta: { requireAuth: true },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login.vue"),
    meta: { requireAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Auth/Register.vue"),
    meta: { requireAuth: false },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const { token } = storeToRefs(useAuthStore());
  if (to.meta.requireAuth) {
    if (token.value !== null) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
