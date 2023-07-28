<script setup lang="ts">
import { ITag } from "@/interfaces/ITag";
import { PropType } from "vue";

const props = defineProps({
  Tag: {
    type: Object as PropType<Pick<ITag, "name">>,
    required: false,
    default: () => ({
      name: "",
    }),
  },
});
defineEmits(["update:Tag"]);

function validateName() {
  if (props?.Tag?.name === "") {
    return "Name is required";
  }
  return true;
}
</script>
<template>
  <VTextField
    id="name"
    prepend-icon="mdi-human-greeting"
    name="name"
    label="Name"
    type="text"
    v-model.trim="Tag.name"
    :rules="[validateName]"
  />
</template>
