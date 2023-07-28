<template>
  <VApp :theme="theme">
    <VAppBar>
      <VSpacer />
      <template v-if="token != null">
        <VBtn :to="{ name: 'Tasks' }">Tasks</VBtn>
        <VBtn :to="{ name: 'Tags' }">Tags</VBtn>
      </template>
      <VBtn
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
        >Toggle Theme</VBtn
      >
      <VBtn @click="logout" color="error" v-if="token != null">Logout</VBtn>
    </VAppBar>
    <VMain>
      <VContainer>
        <slot></slot>
        <VCard
          style="position: fixed; bottom: 0; right: 0; z-index: 9999"
          v-if="successMessage"
        >
          <VAlert type="success" dense >
            {{ successMessage }}
          </VAlert>
        </VCard>
        <VCard
          style="position: fixed; bottom: 0; right: 0; z-index: 9999"
          v-if="errorMessage"
        >
          <VAlert type="error" dense >
            {{ errorMessage }}
          </VAlert>
        </VCard>
      </VContainer>
    </VMain>
  </VApp>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useNotificationsStore } from "@/store/notifications";
const theme = ref(localStorage.getItem("mode") || "light");
const { token } = storeToRefs(useAuthStore());
const authStore = useAuthStore();
const notificationsStore = useNotificationsStore();
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const router = useRouter();
function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
  localStorage.setItem("mode", theme.value);
}
function logout() {
  authStore.logout();
  router.push({ name: "Login" });
}
watchEffect(() => {
  if (successMessage.value) {
    setTimeout(() => {
      notificationsStore.setSuccessMessage("");
    }, 3000);
  }
});
watchEffect(() => {
  if (errorMessage.value) {
    setTimeout(() => {
      notificationsStore.setErrorMessage("");
    }, 3000);
  }
});
</script>
