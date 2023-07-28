<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useApi from "@/hooks/useApi";
import { createTaskRequest } from "@/views/Tasks/api/tasks.api";
import TasksForm from "@/views/Tasks/components/TasksForm.vue";
import { ITask } from "@/interfaces/ITask";
const task = reactive<Omit<ITask, "user_id">>({
  title: "",
  description: "",
  isCompleted: false,
  dueDate: undefined,
  tag_id: null,
});
const valid = ref<boolean>(false);
const form = ref();

const router = useRouter();

const { request, loading } = useApi<ITask>(createTaskRequest);

async function handleSubmit(e: Event) {
  const validate = await form.value.validate();
  if (validate.valid === false) return;
  const formData = new FormData(e.target as HTMLFormElement);
  formData.append("tag_id", (task.tag_id as unknown) as string);
  await request(formData);
  router.push({ name: "Tasks" });
}
</script>

<template>
  <VCard class="elevation-12">
    <VForm lazy-validation @submit.prevent="handleSubmit" v-model="valid" ref="form">
      <VToolbar dark color="primary">
        <VToolbarTitle>Add New Task</VToolbarTitle>
      </VToolbar>
      <VCardText>
        <TasksForm :task.sync="task" />
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" type="submit" :loading="loading"> Save </VBtn>
        </VCardActions>
      </VCardText>
    </VForm>
  </VCard>
</template>
