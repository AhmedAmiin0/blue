<!-- login -->
<template>
  <VCard class="elevation-12">
    <VForm ref="form" @submit.prevent="handleSubmit" lazy-validation>
      <VToolbar dark color="primary">
        <VToolbarTitle>Login form</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <VTextField
          id="email"
          prepend-icon="mdi-email"
          name="email"
          label="Email"
          type="email"
          v-model="email"
          :rules="[validateEmail]"
        />
        <VTextField
          id="password"
          name="password"
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          :type="passwordVisible ? 'text' : 'password'"
          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordVisible = !passwordVisible"
        />
      </VCardText>
      <VCardActions style="justify-content: space-between; width: 100%">
        <VBtn color="primary" :to="{ name: 'Register' }">
          You don't have an account?
        </VBtn>
        <VBtn color="primary" type="submit" :loading="loading">Login</VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import useApi from "@/hooks/useApi";
import { loginRequest } from "@/views/Auth/api/auth.endpoints";
import { IUserLoginResponse } from "@/interfaces/IUser";
const form = ref();
const email = ref<string>("");
const password = ref<string>("");
const passwordVisible = ref<boolean>(false);
const router = useRouter();
const { loading, request } = useApi<IUserLoginResponse>(loginRequest);

const store = useAuthStore();

async function handleSubmit() {
  try {
    const validate = await form.value.validate();
    if (validate.valid === false) return;
    const data = await request({
      email: email.value,
      password: password.value,
    });
    store.login(data);
    router.push({ name: "Tasks" });
  } catch (e) {
    console.log(e);
  }
}
function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return "E-mail must be valid.";
  }
  return true;
}
</script>
