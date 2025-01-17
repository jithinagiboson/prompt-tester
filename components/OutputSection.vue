<template>
<section :class="viewOption === 'output' ? 'relative inset-0 bg-white p-6' : 'bg-white p-6 rounded-lg shadow-md'">
    <h2 class="text-2xl font-bold mb-4">Output Section</h2>
    <div class="mb-4">
      <label for="response" class="block text-gray-700 font-bold mb-2">AI Response</label>
      <textarea id="response" v-model="response" class="w-full p-2 border rounded-lg" rows="10" readonly></textarea>
    </div>
    <div class="mb-4">
      <label for="format" class="block text-gray-700 font-bold mb-2">Response Format</label>
      <select id="format" v-model="responseFormat" class="w-full p-2 border rounded-lg">
        <option value="json">JSON</option>
        <option value="text">Plain Text</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="responseTime" class="block text-gray-700 font-bold mb-2">Response Time</label>
      <input id="responseTime" v-model="responseTime" type="text" class="w-full p-2 border rounded-lg" readonly>
    </div>
    <div class="mb-4">
      <button @click="exportResults" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Export Results</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// const response = ref('');
// const responseFormat = ref('json');
// const responseTime = ref('');
const viewOption = useViewOption() // Add viewOption property

const response=useResponse() 
const responseFormat=useResponseFormat() 
const responseTime= useResponseTime() 
const exportResults = () => {
  alert('Results exported!');
};
</script>

<style scoped>
/* Add any specific styles for the component here */
</style>
