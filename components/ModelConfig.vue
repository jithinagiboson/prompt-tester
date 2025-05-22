<template>
  <div class="fixed top-0 right-0 h-full bg-white shadow-lg z-20 w-80 p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Model Configuration</h3>
      <button @click="showPopup=false" class="text-gray-700">Close
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="mb-4">
      <label for="provider" class="block text-gray-700 font-bold mb-2">Select Provider</label>
      <select id="provider" v-model="modelConfig.provider" class="w-full p-2 border rounded-lg">
        <option value="ollama">Ollama</option>
        <option value="openai">OpenAI</option>
        <option value="google">Google (Gemini/Gemma)</option>
      </select>
    </div>
    <div v-if="modelConfig.provider === 'ollama'">
      <div class="mb-4">
        <label for="model" class="block text-gray-700 font-bold mb-2">Select Model</label>
        <select id="model" v-model="modelConfig.model" class="w-full p-2 border rounded-lg">
          <option value="">Select Model</option>
          <option v-for="model in models" :key="model.model" :value="model.model">{{ model.model }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="url" class="block text-gray-700 font-bold mb-2">Ollama Server URL</label>
        <input id="url" v-model="modelConfig.baseUrl" type="text" class="w-full p-2 border rounded-lg">
        <button @click="testConnection" class="bg-green-600 text-white px-4 py-2 rounded-lg ml-2">Test Connection</button>
        <span v-if="connectionStatus" :class="{'text-green-600': connectionStatus === 'connected', 'text-red-600': connectionStatus === 'disconnected'}">{{ connectionStatus }}</span>
      </div>
      <div class="mb-4">
        <button @click="toggleAdvanced" class="bg-gray-600 text-white px-4 py-2 rounded-lg">Advanced Options</button>
      </div>
      <div class="advancedOption overflow-y-auto" v-if="showAdvanced">
        <div class="mb-4">
          <label for="temperature" class="block text-gray-700 font-bold mb-2">Temperature</label>
          <input id="temperature" v-model="modelConfig.temperature" type="range" min="0" max="1" step="0.01" class="w-full">
        </div>
        <div class="mb-4">
          <label for="maxRetries" class="block text-gray-700 font-bold mb-2">Max Retries</label>
          <input id="maxRetries" v-model="modelConfig.maxRetries" type="number" class="w-full p-2 border rounded-lg">
        </div>
        <div class="mb-4">
          <label for="seed" class="block text-gray-700 font-bold mb-2">Seed</label>
          <input id="seed" v-model="modelConfig.seed" type="number" class="w-full p-2 border rounded-lg">
        </div>
        <div class="mb-4">
          <label for="keepAlive" class="block text-gray-700 font-bold mb-2">Keep Alive Duration</label>
          <input id="keepAlive" v-model="modelConfig.keepAlive" type="text" class="w-full p-2 border rounded-lg">
        </div>
        <div class="mb-4">
          <label for="numContext" class="block text-gray-700 font-bold mb-2">Number of Context Tokens</label>
          <input id="numContext" v-model="modelConfig.numContext" type="number" class="w-full p-2 border rounded-lg">
        </div>
        <div class="mb-4">
          <label for="topK" class="block text-gray-700 font-bold mb-2">Top K</label>
          <input id="topK" v-model="modelConfig.topK" type="number" class="w-full p-2 border rounded-lg">
        </div>
        <div class="mb-4">
          <label for="numPredict" class="block text-gray-700 font-bold mb-2">Number of Predictions</label>
          <input id="numPredict" v-model="modelConfig.numPredict" type="number" class="w-full p-2 border rounded-lg">
        </div>
        <div class="mb-4">
          <label for="verbose" class="block text-gray-700 font-bold mb-2">Verbose Mode</label>
          <input id="verbose" v-model="modelConfig.verbose" type="checkbox" class="mr-2"> Enable
        </div>
        <div class="mb-4">
          <label for="stopSequences" class="block text-gray-700 font-bold mb-2">Stop Sequences</label>
          <textarea id="stopSequences" v-model="modelConfig.stopSequences" class="w-full p-2 border rounded-lg" rows="3" placeholder="e.g., END, \n\n"></textarea>
        </div>
      </div>
    </div>
    <div v-else-if="modelConfig.provider === 'openai'">
      <div class="mb-4">
        <label for="openAIApiKey" class="block text-gray-700 font-bold mb-2">OpenAI API Key</label>
        <input id="openAIApiKey" v-model="modelConfig.openAIApiKey" type="password" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="openAIModel" class="block text-gray-700 font-bold mb-2">OpenAI Model</label>
        <select id="openAIModel" v-model="modelConfig.openAIModel" class="w-full p-2 border rounded-lg">
          <option value="gpt-4o">gpt-4o (latest, multimodal)</option>
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-4-1106-preview">gpt-4-1106-preview</option>
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-4-32k">gpt-4-32k</option>
          <option value="gpt-4-turbo">gpt-4-turbo</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-3.5-turbo-instruct">gpt-3.5-turbo-instruct</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="openAITemperature" class="block text-gray-700 font-bold mb-2">Temperature</label>
        <input id="openAITemperature" v-model="modelConfig.openAITemperature" type="range" min="0" max="1" step="0.01" class="w-full">
      </div>
      <div class="mb-4">
        <label for="openAIMaxTokens" class="block text-gray-700 font-bold mb-2">Max Tokens</label>
        <input id="openAIMaxTokens" v-model="modelConfig.openAIMaxTokens" type="number" class="w-full p-2 border rounded-lg">
      </div>
    </div>
    <div v-else-if="modelConfig.provider === 'google'">
      <div class="mb-4">
        <label for="googleApiKey" class="block text-gray-700 font-bold mb-2">Google API Key</label>
        <input id="googleApiKey" v-model="modelConfig.googleApiKey" type="password" class="w-full p-2 border rounded-lg">
      </div>
      <div class="mb-4">
        <label for="googleModel" class="block text-gray-700 font-bold mb-2">Google Model</label>
        <select id="googleModel" v-model="modelConfig.googleModel" class="w-full p-2 border rounded-lg">
          <option value="gemini-pro">Gemini Pro</option>
          <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
          <option value="gemini-2.0-pro">Gemini 2.0 Pro</option>
          <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
          <option value="gemini-1.0-pro-001">Gemini 1.0 Pro 001</option>
          <option value="gemini-1.0-pro-002">Gemini 1.0 Pro 002</option>
          <option value="gemini-pro-vision">Gemini Pro Vision</option>
          <option value="gemini-1.5-pro-latest">Gemini 1.5 Pro (Latest)</option>
          <option value="gemini-1.5-flash-latest">Gemini 1.5 Flash (Latest)</option>
          <option value="gemini-2.0-pro-latest">Gemini 2.0 Pro (Latest)</option>
          <option value="gemma-2b">Gemma 2B</option>
          <option value="gemma-7b">Gemma 7B</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="googleTemperature" class="block text-gray-700 font-bold mb-2">Temperature</label>
        <input id="googleTemperature" v-model="modelConfig.googleTemperature" type="range" min="0" max="2" step="0.01" class="w-full">
      </div>
      <div class="mb-4">
        <label for="googleMaxOutputTokens" class="block text-gray-700 font-bold mb-2">Max Output Tokens</label>
        <input id="googleMaxOutputTokens" v-model="modelConfig.googleMaxOutputTokens" type="number" class="w-full p-2 border rounded-lg">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useModelConfig } from '../composables/states'; // Import global state management

const modelConfig = useModelConfig(); // Use global model configuration
const showPopup = useShowPopUp(); // Use global popup state
const connectionStatus = ref(''); // Local state for connection status
const showAdvanced = ref(false);
const models = ref([]); // Initialize models array

const fetchModels = async () => {
  if (!modelConfig.value) return;
  try {
    const response = await fetch(`${modelConfig.value.baseUrl}/api/tags`);
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
  if (modelConfig.value.provider === 'ollama') {
    fetchModels(); // Call fetchModels when the component is mounted
  }

  // Initialize model and baseUrl from URL if available
  const urlParams = new URLSearchParams(window.location.search);
  const modelFromUrl = urlParams.get('model');
  const baseUrlFromUrl = urlParams.get('baseUrl');

  if (modelFromUrl) {
    modelConfig.value.model = modelFromUrl;
  }
  if (baseUrlFromUrl) {
    modelConfig.value.baseUrl = baseUrlFromUrl;
  }
});

// Watch for changes to model and baseUrl to update the URL
watch(() => modelConfig.value.model, (newModel) => {
  const url = new URL(window.location);
  url.searchParams.set('model', newModel);
  window.history.pushState({}, '', url);
});

watch(() => modelConfig.value.baseUrl, (newBaseUrl) => {
  const url = new URL(window.location);
  url.searchParams.set('baseUrl', newBaseUrl);
  window.history.pushState({}, '', url);
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