<script setup lang="ts">
const props = defineProps({
  title: String,
  content: String,
});

const showModal = ref<boolean>(true);

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <a-modal
    v-model:open="showModal"
    :title="props.title"
    centered
    @ok="modal2Visible = false"
    @cancel="closeModal"
  >
    <p>{{ props.content }}</p>
  </a-modal>
</template>
