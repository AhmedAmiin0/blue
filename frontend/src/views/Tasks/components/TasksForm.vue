<script setup lang="ts">
import useApi from "@/hooks/useApi";
import { ITag } from "@/interfaces/ITag";
import { ITask } from "@/interfaces/ITask";
import { getAllTagsRequest } from "@/views/Tags/api/Tags.api";
import { ref, onUnmounted, onMounted, PropType } from "vue";
const props = defineProps({
  task: {
    type: Object as PropType<Omit<ITask, "user_id">>,
    required: false,
    default: () => ({
      title: "",
      description: "",
      tag_id: "",
      isCompleted: false,
      dueDate: undefined,
    }),
  },
});

defineEmits(["handleFormSubmit"]);

const items = ref<ITag[]>([]);

const { request, loading, abort } = useApi<ITag[]>(getAllTagsRequest);
onMounted(async () => {
  const data = await request();
  items.value = data;
});
onUnmounted(() => {
  abort();
  items.value = [];
});

function validateTitle() {
  if (props.task?.title === "") {
    return "Title is required";
  }
  return true;
}
function validateDescription() {
  if (props.task?.description === "") {
    return "Description is required";
  }
  return true;
}
function validateTag() {
  if (!props.task.tag_id || props.task.tag_id === null) {
    return "Tag is required";
  }
  return true;
}
function validateDueDate() {
  if (props.task.dueDate && new Date(props.task.dueDate) < new Date()) {
    return "Due Date must be greater than today";
  }

  return true;
}
</script>
<template>
  <VTextField
    id="title"
    prepend-icon="mdi-human-greeting"
    name="title"
    label="Title"
    type="text"
    :rules="[validateTitle]"
    v-model.trim="task.title"
  />
  <VTextarea
    id="description"
    name="description"
    label="Description"
    prepend-icon="mdi-book"
    v-model.trim="task.description"
    :rules="[validateDescription]"
  />
  <VAutocomplete
    id="tag_id"
    label="Tag"
    :items="items"
    prepend-icon="mdi-package-variant"
    v-model="task.tag_id"
    item-text="tag_id"
    :item-title="(item) => item.name"
    :item-value="(item) => item.id"
    :rules="[validateTag]"
    :loading="loading"
  />

  <VTextField
    id="dueDate"
    name="dueDate"
    label="Due Date"
    type="date"
    v-model.trim="task.dueDate"
    :rules="[validateDueDate]"
    prepend-icon="mdi-calendar-month"
  />

  <VCheckbox
    id="isCompleted"
    name="isCompleted"
    label="Is Completed"
    v-model="task.isCompleted"
    prepend-icon="mdi-check"
  />
</template>
