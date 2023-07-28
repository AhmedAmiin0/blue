<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect} from "vue";
import useApi from "@/hooks/useApi";
import { useRouter } from "vue-router";
import TasksCard from "@/components/Card.vue";
import { deleteTaskRequest, getAllTasksRequest } from "./api/tasks.api";
import { ITask } from "@/interfaces/ITask";
import { getAllTagsRequest } from "../Tags/api/Tags.api";
import { ITag } from "@/interfaces/ITag";
import { IPaginatedData } from "@/interfaces/IPaginatedData";

const tasks = ref<IPaginatedData<ITask>>({ data: [] });
const { loading, request, abort } = useApi(getAllTasksRequest);
const deleteTask = useApi(deleteTaskRequest);
const getTags = useApi(getAllTagsRequest);
const tags = ref<ITag[]>([]);
const router = useRouter();

const search = ref(router.currentRoute.value.query.search as string);
const tagsFilter = ref(router.currentRoute.value.query.tag_id as string);
const isCompletedFilter = ref(router.currentRoute.value.query.isCompleted as string);
const sort = ref(router.currentRoute.value.query.sort as string);
const page = ref<number>(Number(router.currentRoute.value.query.page) || 1);

onMounted(async () => {
  const data = await getTags.request();
  tags.value = data;
});
onUnmounted(() => {
  getTags.abort();
  tags.value = [];
});

watchEffect(async () => {
  const query = router.currentRoute.value.query;
  const queryStr = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");
  const response = await request(queryStr);
  tasks.value = response;
});
onUnmounted(() => {
  abort();
  tasks.value = { data: [] };
  tags.value = [];
});

const handleBtnClick = (id: number) => {
  router.push({ name: "EditTask", params: { TaskId: id } });
};
async function handleDeleteBtnClick(id: number) {
  await deleteTask.request(id);
  tasks.value.data = tasks.value.data.filter((Task: ITask) => Task.id !== id);
}
function handleChange(key: string, value: string | number) {
  router.push({ query: { ...router.currentRoute.value.query, [key]: value } });
}
</script>
<template>
  <VContainer>
    <VBtn :to="{ name: 'CreateTask' }" color="success"> Create Task </VBtn>
    <VRow>
      <VCol cols="12" md="4">
        <VTextField
          :model-value="search"
          @update:model-value="handleChange('search', $event)"
          label="Search"
          outlined
          dense
          hide-details
          clearable
        />
      </VCol>
      <VCol cols="12" md="4">
        <VAutocomplete
          id="tag_id"
          label="Tag"
          :items="tags"
          item-text="tag_id"
          :item-title="(item) => item.name"
          :item-value="(item) => item.id"
          v-model="tagsFilter"
          @update:model-value="handleChange('tag_id', $event)"
          :loading="loading"
        />
      </VCol>
      <VCol cols="4" md="2">
        <VRadioGroup
          v-model="isCompletedFilter"
          @update:model-value="handleChange('isCompleted', $event)"
          row
        >
          <VRadio label="Is Completed" value="true" />
          <VRadio label="Not Completed" value="false" />
        </VRadioGroup>
      </VCol>
      <VCol cols="4" md="2">
        <VRadioGroup
          v-model="sort"
          @update:model-value="handleChange('sort', $event)"
          row
        >
          <VRadio label="ASC" value="asc" />
          <VRadio label="DESC" value="desc" />
        </VRadioGroup>
      </VCol>
    </VRow>
    <VRow>
      <VCol v-for="Task in tasks.data" cols="12" md="4" :key="Task.id">
        <TasksCard
          :title="Task.title"
          :description="Task.description"
          :isCompleted="Task.isCompleted"
          :id="Task.id"
          :dueDate="Task.dueDate"
          @btn-click="handleBtnClick"
          @delete-btn-click="handleDeleteBtnClick"
        />
      </VCol>
    </VRow>
    <VRow justify="center">
      <VPagination
        v-model="page"
        :length="tasks.total"
        :total-visible="10"
        @update:model-value="handleChange('page', $event)"
      ></VPagination>
    </VRow>
  </VContainer>
</template>
