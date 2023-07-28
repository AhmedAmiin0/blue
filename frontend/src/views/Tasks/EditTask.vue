<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";
import useApi from "@/hooks/useApi";
import { getTaskRequest, updateTaskRequest } from "@/views/Tasks/api/tasks.api";
import TasksForm from "@/views/Tasks/components/TasksForm.vue";
import { useRouter } from "vue-router";
import { ITask } from "@/interfaces/ITask";
const task = reactive<Omit<ITask, "user_id">>({
  description: "",
  title: "",
  isCompleted: false,
  dueDate: undefined,
  tag_id: null,
  tag: null,
});
const valid = ref(false);
const form = ref();

const router = useRouter();
const taskId = router.currentRoute.value.params.TaskId;
const { request, loading } = useApi<ITask>(updateTaskRequest);
const getTask = useApi<ITask>(getTaskRequest);

async function getTaskById() {
  const data = await getTask.request(taskId);

  task.description = data.description;
  task.title = data.title;
  task.isCompleted = data.isCompleted;
  task.dueDate = data.dueDate;
  task.tag_id = data.tag_id;
  task.tag = data.tag;
}

async function handleSubmit(e: Event) {
  const validate = await form.value.validate();
  if (validate.valid === false) return;
  const formData = new FormData(e.target as HTMLFormElement);
  formData.append("tag_id", (task.tag_id as unknown) as string);
  formData.append("_method", "PUT");
  await request(taskId, formData);
}
onMounted(() => {
  getTaskById();
});
onUnmounted(() => {
  getTask.abort();
  task.description = "";
  task.title = "";
  task.isCompleted = false;
  task.dueDate = undefined;
  task.tag_id = null;
  task.tag = null;
});
</script>

<template>
  <VCard class="elevation-12">
    <VForm @submit.prevent="handleSubmit" v-model="valid" ref="form">
      <VToolbar dark color="primary">
        <VToolbarTitle>Edit {{ task?.title || "" }}</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <TasksForm :task.sync="task" />
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" type="submit" :loading="loading && loading === true"
            >Save</VBtn
          >
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>
