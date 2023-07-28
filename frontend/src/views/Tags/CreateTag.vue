<!-- AddTag.vue -->

<template>
  <VCard class="elevation-12">
    <VForm lazy-validation @submit.prevent="handleSubmit" v-model="valid">
      <VToolbar dark color="primary">
        <VToolbarTitle>Add New Tag</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <TagsForm :Tag.sync="Tag" />
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" type="submit" :loading="loading"> Save </VBtn>
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useApi from "@/hooks/useApi";
import { createTagRequest } from "./api/Tags.api";
import TagsForm from "@/views/Tags/components/TagsForm.vue";
import { ITag } from "@/interfaces/ITag";

const Tag = reactive<Pick<ITag, "name">>({ name: "" });
const { request, loading } = useApi(createTagRequest);
const router = useRouter();
const valid = ref<boolean>(false);
const form = ref();
async function handleSubmit() {
  if (form.value && !form.value.validate()) {
    return 
  }

  try {
    const res = await request(Tag);
    router.push({ name: "Tags" });
  } catch (error) {
    console.log(error);
  }
}
</script>
