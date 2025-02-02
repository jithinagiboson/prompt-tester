<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-lg font-bold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this tab?</p>
      <div class="mt-4 flex justify-end">
        <button @click="onCancel" class="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2">Cancel</button>
        <button @click="onConfirm" class="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  onConfirm: {
    type: Function,
    required: true
  },
  onCancel: {
    type: Function,
    required: true
  }
});
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>
