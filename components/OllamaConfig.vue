<template>
  <div class="fixed top-0 right-0 h-full bg-white shadow-lg z-20 w-80 p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Ollama Configuration</h3>
      <button @click="showPopup=false" class="text-gray-700">Close
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="mb-4">
      <label for="model" class="block text-gray-700 font-bold mb-2">Select Model</label>
      <select id="model" v-model="config.model" class="w-full p-2 border rounded-lg">
        <option value="">Select Model</option>
        <option v-for="model in models" :key="model" :value="model.model">{{ model.model }}</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="url" class="block text-gray-700 font-bold mb-2">Ollama Server URL</label>
      <input id="url" v-model="config.baseUrl" type="text" class="w-full p-2 border rounded-lg">
      <button @click="testConnection" class="bg-green-600 text-white px-4 py-2 rounded-lg ml-2">Test Connection</button>
      <span v-if="connectionStatus" :class="{'text-green-600': connectionStatus === 'connected', 'text-red-600': connectionStatus === 'disconnected'}">{{ connectionStatus }}</span>
    </div>
    <div class="mb-4">
      <button @click="toggleAdvanced" class="bg-gray-600 text-white px-4 py-2 rounded-lg">Advanced Options</button>
    </div>
    <div class="advancedOption overflow-y-auto" v-if="showAdvanced">
      <div class="mb-4">
        <label for="temperature" class="block text-gray-700 font-bold mb-2">Temperature</label>
        <input id="temperature" v-model="config.temperature" type="range" min="0" max="1" step="0.01" class="w-full">
      </div>
      <div class="mb-4">
        <label for="maxRetries" class="block text-gray-700 font-bold mb-2">Max Retries</label>
        <input id="maxRetries" v-model="config.maxRetries" type="number" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="seed" class="block text-gray-700 font-bold mb-2">Seed</label>
        <input id="seed" v-model="config.seed" type="number" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="keepAlive" class="block text-gray-700 font-bold mb-2">Keep Alive Duration</label>
        <input id="keepAlive" v-model="config.keepAlive" type="text" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="numContext" class="block text-gray-700 font-bold mb-2">Number of Context Tokens</label>
        <input id="numContext" v-model="config.numContext" type="number" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="topK" class="block text-gray-700 font-bold mb-2">Top K</label>
        <input id="topK" v-model="config.topK" type="number" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="numPredict" class="block text-gray-700 font-bold mb-2">Number of Predictions</label>
        <input id="numPredict" v-model="config.numPredict" type="number" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="verbose" class="block text-gray-700 font-bold mb-2">Verbose Mode</label>
        <input id="verbose" v-model="config.verbose" type="checkbox" class="mr-2"> Enable
      </div>
      <div class="mb-4">
        <label for="stopSequences" class="block text-gray-700 font-bold mb-2">Stop Sequences</label>
        <textarea id="stopSequences" v-model="config.stopSequences" class="w-full p-2 border rounded-lg" rows="3" placeholder="e.g., END, \n\n"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['config']); // Accept props for configuration settings
const showPopup = ref(false);
const connectionStatus = ref('');
const showAdvanced = ref(false);
const models = ref([]); // Initialize models array

const fetchModels = async () => {
  if (!props.config) return;
  try {
    const response = await fetch(`${props.config.baseUrl}/api/tags`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    models.value = data.models; // Populate models array with fetched data
  } catch (error) {
    console.error('Error fetching models:', error);
  }
};

onMounted(() => {
  fetchModels(); // Call fetchModels when the component is mounted
});

const testConnection = async () => {
  // Connection testing logic here
  fetchModels();
};

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
};
</script>

<style scoped>
.advancedOption {
  max-height: 65%; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  width: 300px;
}
</style>
