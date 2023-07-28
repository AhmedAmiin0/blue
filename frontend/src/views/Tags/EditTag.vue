<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import useApi from "@/hooks/useApi";
import { getTagRequest, updateTagRequest } from "./api/Tags.api";
import TagsForm from "@/views/Tags/components/TagsForm.vue";
import { ITag } from "@/interfaces/ITag";
const valid = ref<boolean>(false);
const router = useRouter();

const Tag = reactive<ITag>({
  name: "",
});
const TagId = router.currentRoute.value.params.TagId;
const getTag = useApi<ITag>(getTagRequest);
const { request, loading } = useApi<ITag>(updateTagRequest);

onMounted(async () => {
  const response = await getTag.request(TagId);
  Tag.name = response.name;
});
onUnmounted(() => {
  getTag.abort();
  Tag.name = "";
});

const form = ref();
const handleSubmit = async (e: Event) => {
  const validate = await form.value.validate();
  if (validate.valid === false) return;
  const formData = new FormData(e.target as HTMLFormElement);
  formData.append("_method", "PUT");
  await request(TagId, formData);
};
</script>

<template>
  <VCard class="elevation-12">
    <VForm lazy-validation @submit.prevent="handleSubmit" v-model="valid" ref="form">
      <VToolbar dark color="primary">
        <VToolbarTitle>Edit Tag</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <TagsForm :Tag.sync="Tag" />
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" type="submit" :loading="loading && loading === true">
            Save
          </VBtn>
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>
