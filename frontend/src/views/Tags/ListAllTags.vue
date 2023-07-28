<template>
  <VContainer>
    <VBtn :to="{ name: 'CreateTag' }" color="success"> Create Tag </VBtn>
    <VRow>
      <VCol v-for="Tag in Tags" :key="Tag.id" cols="12" md="4">
        <Card
          :title="Tag.name"
          :id="Tag.id"
          @btn-click="handleBtnClick"
          @delete-btn-click="handleDeleteBtnClick"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import useApi from "@/hooks/useApi";
import { useRouter } from "vue-router";
import {
  deleteTagRequest,
  getAllTagsRequest,
} from "@/views/Tags/api/Tags.api";
import Card from "@/components/Card.vue";
import { ITag } from "@/interfaces/ITag";
const Tags = ref<ITag[]>([]);
const getAllTags = useApi<ITag[]>(getAllTagsRequest);
const deleteTag = useApi<null>(deleteTagRequest);

const router = useRouter();
onMounted(async () => {
  const response = await getAllTags.request();
  Tags.value = response;
});
const handleBtnClick = (id: number) => {
  router.push({ name: "EditTag", params: { TagId: id } });
};
async function handleDeleteBtnClick(id: number) {
  await deleteTag.request(id);
  Tags.value = Tags.value.filter((Tag: ITag) => Tag.id !== id);
}
onUnmounted(() => {
  getAllTags.abort();
  Tags.value = [];
});
</script>
