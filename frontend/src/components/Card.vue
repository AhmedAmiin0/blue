<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: null,
  },
  dueDate: {
    type: Date || null,
    required: false,
    default: null,
  },
  id: {
    type: Number,
    required: false,
    default: null,
  },
});
defineEmits(["btn-click", "delete-btn-click"]);
</script>
<template>
  <VCard class="mx-auto my-12" max-width="374">
    <VCardItem v-if="title">
      <VCardTitle>
        {{ title }}
      </VCardTitle>
    </VCardItem>

    <VCardItem v-if="isCompleted != null">
      <VCardText>
        <VChip color="success" v-if="isCompleted == true"> Completed </VChip>
        <VChip color="red" v-else> Not Completed </VChip>
      </VCardText>
    </VCardItem>
    <VCardItem v-if="description">
      <VCardText>
        {{ description }}
      </VCardText>
    </VCardItem>

    <VCardItem v-if="dueDate">
      <VCardText>
        {{ dueDate }}
      </VCardText>
    </VCardItem>

    <VDivider class="mx-4 mb-1" />

    <VCardActions>
      <VBtn color="deep-purple-lighten-2" variant="text" @click="$emit('btn-click', id)">
        details
      </VBtn>
      <VBtn color="error" variant="text" @click="$emit('delete-btn-click', id)">
        delete
      </VBtn>
    </VCardActions>
  </VCard>
</template>
